
create table "GithubUsers" (
    "id" int primary key,
    "login" text not null,
    "name" text not null
);

create table "Users" (
    "id" serial primary key,
    "handle" text not null unique,
    "displayName" text not null,
    "createdAt" timestamp with time zone not null,
    "githubUserId" int references "GithubUsers"(id) unique
);

create table "UserThemes" (
    "id" serial primary key ,
    "ownerId" int references "Users"("id") not null,
    "name"  text not null ,
    "data" json not null,
    "checkeredRow" boolean not null ,
    "messageSeparator" boolean not null ,
    "createdAt" timestamp with time zone not null ,
    "modifiedAt" timestamp with time zone not null
)
