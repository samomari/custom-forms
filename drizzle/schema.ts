import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  unique,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const user = pgTable(
  "users",
  {
    id: varchar("id").primaryKey(),
    email: varchar("email", { length: 255 }).notNull(),
    username: varchar("username", { length: 100 }).notNull(),
    role: text("role", { enum: ["USER", "ADMIN"] })
      .default("USER")
      .notNull(),
    status: text("status", { enum: ["ACTIVE", "BLOCKED"] })
      .default("ACTIVE")
      .notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [uniqueIndex("username_idx").on(t.username)],
);

export const topic = pgTable(
  "topics",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
  },
  (t) => [unique("topic_name_idx").on(t.name)],
);

export const template = pgTable("templates", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: varchar("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  topicId: uuid("topic_id")
    .notNull()
    .references(() => topic.id),
  imageUrl: text("image_url"),
  isPublic: boolean("is_public").default(false).notNull(),
  likeCount: integer("like_count").default(0).notNull(),
  formCount: integer("form_count").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const question = pgTable("questions", {
  id: uuid("id").defaultRandom().primaryKey(),
  templateId: uuid("template_id")
    .notNull()
    .references(() => template.id, { onDelete: "cascade" }),
  type: integer("type").notNull(),
  position: integer("position").notNull(),
  content: text("content").notNull(),
});

export const form = pgTable("forms", {
  id: uuid("id").defaultRandom().primaryKey(),
  templateId: uuid("template_id")
    .notNull()
    .references(() => template.id, { onDelete: "cascade" }),
  userId: varchar("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const answer = pgTable("answers", {
  id: uuid("id").defaultRandom().primaryKey(),
  formId: uuid("form_id")
    .notNull()
    .references(() => form.id, { onDelete: "cascade" }),
  questionId: uuid("question_id")
    .notNull()
    .references(() => question.id, { onDelete: "cascade" }),
  value: text("value").notNull(),
});

export const comment = pgTable("comments", {
  id: uuid("id").defaultRandom().primaryKey(),
  templateId: uuid("template_id")
    .notNull()
    .references(() => template.id, { onDelete: "cascade" }),
  userId: varchar("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const like = pgTable(
  "likes",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    templateId: uuid("template_id")
      .notNull()
      .references(() => template.id, { onDelete: "cascade" }),
    userId: varchar("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (t) => [unique("unique_like").on(t.templateId, t.userId)],
);

export const privateTemplateAccess = pgTable(
  "private_templates_access",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    templateId: uuid("template_id")
      .notNull()
      .references(() => template.id, { onDelete: "cascade" }),
    userId: varchar("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (t) => [unique("unique_template_user_access").on(t.templateId, t.userId)],
);
