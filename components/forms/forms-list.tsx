import { FormCard } from "./form-card";

interface FormsListProps {
  forms: { id: string; username: string; updatedAt: Date }[]; // Define the 'Form' type based on your database schema
}

export default function FormsList({ forms }: FormsListProps) {
  return (
    <div className="xl:w-1/2 md:w-1/2 flex justify-center items-baseline">
      <div className="w-full flex flex-col space-y-4">
        {forms.map((form) => (
          <FormCard
            key={form.id}
            id={form.id}
            username={form.username}
            updatedAt={form.updatedAt}
          />
        ))}
      </div>
    </div>
  );
}
