import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
error=false

fb=inject(FormBuilder);
authService=inject(AuthService);
router=inject(Router)

form=this.fb.nonNullable.group({
  email:["", [Validators.required, Validators.email]],
  password:["", [Validators.required, Validators.minLength(6)]],
  confirmPassword:["",[Validators.required]],
})

onSubmit():void{
  if(this.form.invalid){
    return
  }
  const {email, password, confirmPassword}=this.form.getRawValue();

  if (password !== confirmPassword){
    this.error=true;
    console.error("las contraseñas no coinciden guapi")
    return
  }

  this.authService.register(email, password).subscribe({
    next:()=>{
      this.router.navigateByUrl("/home");

    },
    error:(error: any)=>{
      this.error=true;
      console.error("error en registro baby", error)
    }
  })
}
}
