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
  custom_string1_state: boolean("custom_string1_state").default(false),
  custom_string1_position: integer("custom_string1_position")
    .default(0)
    .notNull(),
  custom_string1_question: varchar("custom_string1_question").default(""),
  custom_string2_state: boolean("custom_string2_state").default(false),
  custom_string2_position: integer("custom_string2_position")
    .default(0)
    .notNull(),
  custom_string2_question: varchar("custom_string2_question").default(""),
  custom_string3_state: boolean("custom_string3_state").default(false),
  custom_string3_position: integer("custom_string3_position")
    .default(0)
    .notNull(),
  custom_string3_question: varchar("custom_string3_question").default(""),
  custom_string4_state: boolean("custom_string4_state").default(false),
  custom_string4_position: integer("custom_string4_position")
    .default(0)
    .notNull(),
  custom_string4_question: varchar("custom_string4_question").default(""),
  custom_int1_state: boolean("custom_int1_state").default(false),
  custom_int1_position: integer("custom_int1_position").default(0).notNull(),
  custom_int1_question: integer("custom_int1_question").default(0),
  custom_int2_state: boolean("custom_int2_state").default(false),
  custom_int2_position: integer("custom_int2_position").default(0).notNull(),
  custom_int2_question: integer("custom_int2_question").default(0),
  custom_int3_state: boolean("custom_int3_state").default(false),
  custom_int3_position: integer("custom_int3_position").default(0).notNull(),
  custom_int3_question: integer("custom_int3_question").default(0),
  custom_int4_state: boolean("custom_int4_state").default(false),
  custom_int4_position: integer("custom_int4_position").default(0).notNull(),
  custom_int4_question: integer("custom_int4_question").default(0),
  custom_line1_state: boolean("custom_line1_state").default(false),
  custom_line1_position: integer("custom_line1_position").default(0).notNull(),
  custom_line1_question: text("custom_line1_question").default(""),
  custom_line2_state: boolean("custom_line2_state").default(false),
  custom_line2_position: integer("custom_line2_position").default(0).notNull(),
  custom_line2_question: text("custom_line2_question").default(""),
  custom_line3_state: boolean("custom_line3_state").default(false),
  custom_line3_position: integer("custom_line3_position").default(0).notNull(),
  custom_line3_question: text("custom_line3_question").default(""),
  custom_line4_state: boolean("custom_line4_state").default(false),
  custom_line4_position: integer("custom_line4_position").default(0).notNull(),
  custom_line4_question: text("custom_line4_question").default(""),
  custom_checkbox1_state: boolean("custom_checkbox1_state").default(false),
  custom_checkbox1_position: integer("custom_checkbox1_position")
    .default(0)
    .notNull(),
  custom_checkbox1_question: text("custom_checkbox1_question").default(""),
  custom_checkbox2_state: boolean("custom_checkbox2_state").default(false),
  custom_checkbox2_position: integer("custom_checkbox2_position")
    .default(0)
    .notNull(),
  custom_checkbox2_question: text("custom_checkbox2_question").default(""),
  custom_checkbox3_state: boolean("custom_checkbox3_state").default(false),
  custom_checkbox3_position: integer("custom_checkbox3_position")
    .default(0)
    .notNull(),
  custom_checkbox3_question: text("custom_checkbox3_question").default(""),
  custom_checkbox4_state: boolean("custom_checkbox4_state").default(false),
  custom_checkbox4_position: integer("custom_checkbox4_position")
    .default(0)
    .notNull(),
  custom_checkbox4_question: text("custom_checkbox4_question").default(""),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const form = pgTable("forms", {
  id: uuid("id").defaultRandom().primaryKey(),
  templateId: uuid("template_id")
    .notNull()
    .references(() => template.id, { onDelete: "cascade" }),
  userId: varchar("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  custom_string1_question: varchar("custom_string1_question").default(""),
  custom_string2_question: varchar("custom_string2_question").default(""),
  custom_string3_question: varchar("custom_string3_question").default(""),
  custom_string4_question: varchar("custom_string4_question").default(""),
  custom_int1_question: integer("custom_int1_question").default(0),
  custom_int2_question: integer("custom_int2_question").default(0),
  custom_int3_question: integer("custom_int3_question").default(0),
  custom_int4_question: integer("custom_int4_question").default(0),
  custom_line1_question: text("custom_line1_question").default(""),
  custom_line2_question: text("custom_line2_question").default(""),
  custom_line3_question: text("custom_line3_question").default(""),
  custom_line4_question: text("custom_line4_question").default(""),
  custom_checkbox1_question: text("custom_checkbox1_question").default(""),
  custom_checkbox2_question: text("custom_checkbox2_question").default(""),
  custom_checkbox3_question: text("custom_checkbox3_question").default(""),
  custom_checkbox4_question: text("custom_checkbox4_question").default(""),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
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
