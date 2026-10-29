import { inject, Service, signal } from '@angular/core';
import { LocalStorageService } from './local-storage-service';

@Service()
export class UserService {
    storageService = inject(LocalStorageService);
    private users = signal<UserAccount[]>([]); 

    constructor(){
        this.initializeRestaurants();
    }


    Login(){

    }

    Register(){

    }

    Add(user: UserAccount){
        
    }
    Update(){

    }
    Delete(){

    }
    GetById(id: number){
        return this.users().find(u => u.id === id);
    }
    GetAll(){
        return this.users();
    }

    private initializeRestaurants(){
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
}
