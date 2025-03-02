import { DataTable } from "@/components/ui/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { UserType } from "@/types";
import { UserCard } from "../user/user-card";

type Tab = {
  value: string;
  label: string;
  data: any[];
  columns: any[];
  emptyMessage: string;
  link?: string | null;
  linkText?: string | null;
};

interface DashboardProps {
  tabs: Tab[];
  user?: UserType;
}

interface EmptyStateProps {
  message: string;
  link?: string | null;
  linkText?: string | null;
}

export default function Dashboard({ tabs, user }: DashboardProps) {
  const t = useTranslations("Dashboard");
  return (
    <div className="h-full w-full overflow-hidden p-6">
      {user && <UserCard user={user} />}
      <Tabs defaultValue={tabs[0].value}>
        <div className="sm:flex-row flex flex-col-reverse items-center justify-between space-x-4">
          <TabsList className="flex space-x-4">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <Link href="/templates/new" className="mb-2 sm:mb-0">
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
