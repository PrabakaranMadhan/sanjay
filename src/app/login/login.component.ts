import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormControl,
  UntypedFormBuilder,
} from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "src/app/shared/auth-service/auth.service";
import { ApiService } from "src/app/shared/api-service/api.service";
import { MessageService } from "primeng/api";
import { Router } from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: any;
  submitted = false;
  // modalRef?: BsModalRef;
  disableButton: boolean = false;
  errormsg = "";
  otpLoading: boolean = false;

  constructor(
    private authservice: AuthService,
    public service: ApiService,
    private fb: UntypedFormBuilder,
    private messageService: MessageService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.formGroup = this.fb.group({
      password: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
    });
  }
  get f() {
    return this.formGroup.controls;
  }

  loginproces() {
    this.submitted = true;
    if (this.formGroup.invalid) {
      return;
    }
    this.disableButton = true;
    this.otpLoading = true;
    this.service.postService("login", this.formGroup.value).subscribe(
      (res: any) => {
        if (res.status == "success") {
          this.otpLoading = false;
          this.disableButton = false;
          this.authservice.session('set', 'authorization', res.access_token);
          this.authservice.session(
            'set',
            'userDetail',
            JSON.stringify(res.userdata)
          );
          this.service.toggleLogin(true);
          let redir = sessionStorage.getItem('redirectToPage');
          console.log(redir);
          if (redir != null) {
            this.router.navigate([redir]);
            sessionStorage.removeItem('redirectToPage');
          } else {
            this.router.navigate(['/dashboard']);
          }
          console.log(res);
        }
      },
      (err: any) => {
        const er = err.error.status ? err.error.status : 0;
        this.errormsg = "Unknown Error Occured";
        if (er == "error") {
          this.errormsg = err.error.error;
        }
        this.messageService.add({
          severity: "error",
          summary: "Error Login",
          detail: this.errormsg,
        });
        this.disableButton = false;
        this.otpLoading = false;
      }
    );
  }
}

