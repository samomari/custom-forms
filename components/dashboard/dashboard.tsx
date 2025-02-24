import { DataTable } from "@/components/ui/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

type Tab = {
  value: string;
  label: string;
  data: any[];
  columns: any[];
  emptyMessage: string;
  link?: string | null;
  linkText?: string | null;
};

interface EmptyStateProps {
  message: string;
  link?: string | null;
  linkText?: string | null;
}

export default function Dashboard({ tabs }: { tabs: Tab[] }) {
  const t = useTranslations("Dashboard");
  return (
    <div className="h-full w-full overflow-hidden p-6">
      <Tabs defaultValue={tabs[0].value}>
        <div className="flex items-center justify-between space-x-4">
          <TabsList className="flex space-x-4">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <Link href="/templates/new">
            <Button>{t("templatesTabLink")}</Button>
          </Link>
        </div>
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.data.length > 0 ? (
              <DataTable columns={tab.columns} data={tab.data} />
            ) : (
              <EmptyState
                message={tab.emptyMessage}
                link={tab.link}
                linkText={tab.linkText}
              />
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function EmptyState({ message, link, linkText }: EmptyStateProps) {
  return (
    <div className="text-center py-6">
      <p>
        {message}
        {link && (
          <Link href={link}>
            <Button variant="link">{linkText}</Button>
          </Link>
        )}
      </p>
    </div>
  );
}
