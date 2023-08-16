create table "Users" (
    "id" serial primary key,
    "handle" text not null unique,
    "displayName" text not null,
    "createdAt" timestamp with time zone not null,
    "githubUserId" int references "GithubUsers"(id)
);

create table "GithubUsers" (
    "id" int primary key,
    "login" text not null,
    "name" text not null
);
