import { inject, Service, signal } from '@angular/core';
import { LocalStorageService } from './local-storage-service';
import { AdminAccount, UserAccount, UserRole, UserSeesion } from '../models/user.model';

@Service()
export class UserService {
    storageService = inject(LocalStorageService);
    private users = signal<UserAccount[]>([]); 
    private currentUser = signal<UserAccount | null>(null);
    isLoggedIn = this.currentUser.asReadonly();

    constructor(){
        this.initializeUsers();
        this.initializeSession();
    }


    Login(email: string, password: string){
        const user = this.GetAll().find(u => u.email.toLowerCase() === email.trim().toLowerCase());
        if(user === undefined){
            console.log("User not found");
            return false;
        }
        if(user.password !== password){
            console.log("Incorrect password");
            return false;
        }
        const userSession: UserSeesion = {
            userId: user.id,
            expiresAt: Date.now() + 10 * 60 * 1000
        }

        sessionStorage.setItem('user', JSON.stringify(userSession));
        this.currentUser.set(user);
        return true;
    }

    Register(user: UserAccount){
        this.Add(user);
        this.Login(user.email, user.password);
    }

    ifLoggedIn(){
        const storedUser = sessionStorage.getItem('user');
        if(storedUser === null)
            return false;

        const user: UserSeesion = JSON.parse(storedUser);
        if(Date.now() >= user.expiresAt){
            sessionStorage.removeItem('user');
            this.currentUser.set(null);
            return false
        }
        return true;
    }

    ifAdmin(){
        if(!this.ifLoggedIn())
            return false;

        const storedUser = sessionStorage.getItem('user');
        if(storedUser === null)
            return false;

        const session = JSON.parse(storedUser);

        const fullUser = this.GetById(session.userId);
        if(fullUser === null || fullUser === undefined)
            return false;

        return fullUser.role === UserRole.admin;
    }

    Add(user: UserAccount){
        this.users.update(u => [...u, user]);
        this.storageService.saveToLocalStorage('users', this.users());    
    }

    Update(user: UserAccount){
        this.users.update(users => 
            users.map(u =>
                u.id === user.id ? user : u
            )
        );

        this.storageService.saveToLocalStorage('users', this.users());
    }
    
    Delete(id: number){
        this.users.update(users => 
            users.filter(u => u.id !== id)
        );

        this.storageService.saveToLocalStorage('users', this.users());
    }

    GetById(id: number){
        return this.users().find(u => u.id === id);
    }

    GetAll(){
        return this.users();
    }

    private initializeUsers(){
        const storedData = this.storageService.getFromLocalStorage('users');

        if(storedData === null){
            const admin: AdminAccount = {
                id: 1,
                role: UserRole.admin,
                name: 'admin',
                email: 'email@email.com',
                password: 'password'
            }
            this.users.set([admin]);
            this.storageService.saveToLocalStorage('users', this.users())
        } else {
            this.users.set(storedData);
        }
    }

    private initializeSession() {
        const storedSession = sessionStorage.getItem('user');

        if (storedSession === null) 
            return;

        const session: UserSeesion = JSON.parse(storedSession);

        if (Date.now() >= session.expiresAt) {
            sessionStorage.removeItem('user');
            return;
        }

        const user = this.GetById(session.userId);

        if (user === undefined) {
            sessionStorage.removeItem('user');
            return;
        }

        this.currentUser.set(user);
    } 
}
