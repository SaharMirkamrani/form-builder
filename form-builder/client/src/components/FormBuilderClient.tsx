"use client";
import { DndContext, closestCenter } from '@dnd-kit/core';
import
  {
    SortableContext,
    arrayMove,
    useSortable,
    verticalListSortingStrategy,
  } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormRenderer from './FormRenderer';
import { InputFieldProps } from './InputField';
import { Button } from './ui/button';
import { Input } from './ui/input';
import
  {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from './ui/select';

function DraggableField({ id, children }: { id: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  return (
    <li
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        background: isDragging ? '#f3f4f6' : undefined,
      }}
      className="flex items-center gap-2 mb-2 rounded"
      {...attributes}
    >
      <span {...listeners} className="cursor-grab p-1 text-muted-foreground">
        <GripVertical size={18} />
      </span>
      {children}
    </li>
  );
}

export default function FormBuilderClient() {
  const [fields, setFields] = useState<InputFieldProps[]>([]);
  const [newType, setNewType] = useState<'text' | 'checkbox' | 'radio'>('text');
  const [newLabel, setNewLabel] = useState('');
  const [preview, setPreview] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3001/forms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });
      if (!res.ok) throw new Error('Failed to save');
      toast.success('Saved!');
    } catch (err: any) {
      toast.error(err.message || 'Error saving');
    } finally {
      setLoading(false);
    }
  }

  async function handleLoad() {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3001/forms');
      if (!res.ok) throw new Error('Failed to load');
      const data = await res.json();
      if (Array.isArray(data)) {
        setFields(data);
        toast.success('Loaded!');
      } else if (data && typeof data === 'object' && Object.keys(data).length === 0) {
        // If backend returns empty object, treat as empty array
        setFields([]);
        toast.success('Loaded!');
      } else if (!data) {
        setFields([]);
        toast.success('Loaded!');
      } else {
        toast.error('Invalid schema loaded');
      }
    } catch (err: any) {
      toast.error(err.message || 'Error loading');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleAddField() {
    if (!newLabel.trim()) return;
    setFields([...fields, { type: newType, label: newLabel }]);
    setNewLabel('');
  }

  function handleRemoveField(idx: number) {
    setFields(fields.filter((_, i) => i !== idx));
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="flex gap-2 items-center mb-4">
        <Button type="button" variant="secondary" onClick={() => setPreview(p => !p)}>
          {preview ? 'Switch to Builder Mode' : 'Switch to Preview Mode'}
        </Button>
        <Button type="button" onClick={handleSave} disabled={preview || loading}>
          {loading ? 'Saving...' : 'Save'}
        </Button>
        {/* <Button type="button" onClick={handleLoad} disabled={preview || loading}>
          {loading ? 'Loading...' : 'Load'}
        </Button> */}
      </div>

      {!preview && (
        <div className="mb-6 border rounded-md p-4">
          <h2 className="text-lg font-semibold mb-2">Add Field</h2>
          <div className="flex gap-2 items-center">
            <Select value={newType} onValueChange={v => setNewType(v as any)}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="checkbox">Checkbox</SelectItem>
                <SelectItem value="radio">Radio</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="text"
              placeholder="Field label"
              value={newLabel}
              onChange={e => setNewLabel(e.target.value)}
              className="flex-1"
            />
            <Button type="button" onClick={handleAddField} disabled={!newLabel.trim()}>
              Add
            </Button>
          </div>
        </div>
      )}

      {!preview && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Fields</h2>
          {fields.length === 0 && <div className="text-muted-foreground">No fields added yet.</div>}
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={event => {
              const { active, over } = event;
              if (active.id !== over?.id) {
                const oldIndex = fields.findIndex((f, i) => f.label + f.type + i === active.id);
                const newIndex = fields.findIndex((f, i) => f.label + f.type + i === over?.id);
                if (oldIndex !== -1 && newIndex !== -1) {
                  setFields(arrayMove(fields, oldIndex, newIndex));
                }
              }
            }}
          >
            <SortableContext
              items={fields.map((f, i) => f.label + f.type + i)}
              strategy={verticalListSortingStrategy}
            >
              <ul className="list-none p-0">
                {fields.map((field, idx) => (
                  <DraggableField key={field.label + field.type + idx} id={field.label + field.type + idx}>
                    <span className="min-w-[80px] font-medium">{field.label}</span>
                    <span className="text-muted-foreground text-sm">{field.type}</span>
                    <Button type="button" variant="destructive" size="sm" onClick={() => handleRemoveField(idx)}>
                      X
                    </Button>
                  </DraggableField>
                ))}
              </ul>
            </SortableContext>
          </DndContext>
        </div>
      )}

      {preview && (
        <FormRenderer fields={fields} disabled={false} />
      )}
    </>
  );
} 
