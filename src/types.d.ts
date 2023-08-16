declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_GITHUB_CLIENT_ID: string;

    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;
    POSTGRES_URL: string;
  }
}

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};