import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { ServiceAlert } from 'src/app/services/servicealert.service'; 

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  form!: FormGroup;
  id_rol: number = 2; 

  constructor(
    private bd: ServicebdService,
    private router: Router,
    private fb: FormBuilder,
    private serviceAlert: ServiceAlert 
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      pnombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      apellido: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      nom_usuario: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
        this.passwordValidator
      ]],
      confirmar_contrasena: ['', [Validators.required]],
      terminos: [false, Validators.requiredTrue]
    }, { validator: this.passwordsMatch });
  }

  passwordValidator(control: any) {
    const password = control.value;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const valid = hasLetter && hasNumber && hasSymbol;
    return valid ? null : { invalidPassword: true };
  }

  passwordsMatch(group: FormGroup) {
    const password = group.get('contrasena')?.value;
    const confirmPassword = group.get('confirmar_contrasena')?.value;
    return password === confirmPassword ? null : { passwordsDoNotMatch: true };
  }

  async crear() {
    if (this.form.valid) {
      const { pnombre, apellido, nom_usuario, correo, contrasena } = this.form.value;
      const usuarioExistente = await this.bd.verificarUsuario(nom_usuario, correo); 
      if (usuarioExistente) {
        this.serviceAlert.presentAlert('Error', 'El nombre de usuario o correo ya están en uso.'); 
      } else {
        
        await this.bd.insertarUsuario(pnombre, apellido, nom_usuario, correo, contrasena, this.id_rol);
        
        
        localStorage.setItem('usuario', JSON.stringify({ pnombre, apellido, nom_usuario, correo }));
        
        
        this.router.navigate(['/login']);
      }
    }
  }

  
  isNombreInvalid() {
    const control = this.form.get('pnombre');
    return control?.touched && control.invalid;
  }

  getNombreError() {
    const control = this.form.get('pnombre');
    if (control?.hasError('required')) {
      return 'El nombre es requerido';
    } else if (control?.hasError('pattern')) {
      return 'El nombre solo debe contener letras';
    }
    return '';
  }

  isApellidoInvalid() {
    const control = this.form.get('apellido');
    return control?.touched && control.invalid;
  }

  getApellidoError() {
    const control = this.form.get('apellido');
    if (control?.hasError('required')) {
      return 'El apellido no puede estar vacío.';
    } else if (control?.hasError('pattern')) {
      return 'El apellido solo debe contener letras.';
    }
    return '';
  }

  isUsuarioInvalid() {
    const control = this.form.get('nom_usuario');
    return control?.touched && control.invalid;
  }

  getUsuarioError() {
    const control = this.form.get('nom_usuario');
    if (control?.hasError('required')) {
      return 'El nombre de usuario no puede estar vacío.';
    } else if (control?.hasError('pattern')) {
      return 'El nombre de usuario solo debe contener letras.';
    }
    return '';
  }

  isCorreoInvalid() {
    const control = this.form.get('correo');
    return control?.touched && control.invalid;
  }

  getCorreoError() {
    const control = this.form.get('correo');
    if (control?.hasError('required')) {
      return 'El correo no puede estar vacío.';
    } else if (control?.hasError('email')) {
      return 'El formato del correo no es válido.';
    }
    return '';
  }

  isContrasenaInvalid() {
    const control = this.form.get('contrasena');
    return control?.touched && control.invalid;
  }

  getContrasenaError() {
    const control = this.form.get('contrasena');
    if (control?.hasError('required')) {
      return 'La contraseña no puede estar vacía.';
    } else if (control?.hasError('minlength')) {
      return 'La contraseña debe tener al menos 8 caracteres.';
    } else if (control?.hasError('maxlength')) {
      return 'La contraseña no puede tener más de 16 caracteres.';
    } else if (control?.hasError('invalidPassword')) {
      return 'La contraseña debe contener letras, números y símbolos.';
    }
    return '';
  }

  isConfirmarContrasenaInvalid() {
    const control = this.form.get('confirmar_contrasena');
    return control?.touched && control.invalid;
  }

  getConfirmarContrasenaError() {
    const control = this.form.get('confirmar_contrasena');
    if (control?.hasError('required')) {
      return 'La confirmación de la contraseña es obligatoria.';
    } else if (control?.hasError('passwordsDoNotMatch')) {
      return 'Las contraseñas no coinciden.';
    }
    return '';
  }
}

