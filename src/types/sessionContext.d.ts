type SessionContextModel = {
    user?: User
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>
    login: (email: string, password: string) => Promise<boolean>
    signup: (name: string, lastname: string, email: string, password: string) => Promise<boolean>
    logout: () => void
}