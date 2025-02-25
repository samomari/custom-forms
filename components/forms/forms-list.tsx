import { FormCard } from "./form-card";

interface FormsListProps {
  forms: { id: string; username: string; updatedAt: Date }[]; // Define the 'Form' type based on your database schema
}

export default function FormsList({ forms }: FormsListProps) {
  return (
    <div className="lg:w-3/4 w-full flex justify-center items-baseline">
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
