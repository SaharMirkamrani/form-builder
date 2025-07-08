import FormBuilderClient from '../components/FormBuilderClient';

export default function HomePage() {
  return (
    <main style={{ padding: 32 }}>
      <h1 className='text-3xl font-bold mb-5'>Form Builder</h1>
      <FormBuilderClient />
    </main>
  );
}
