export default function GitHubLogin() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <a
                href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI}`}
            >
                Login With GitHub
            </a>
        </div>
    );
}
