import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { ApiService } from "src/app/shared/api-service/api.service";
import { AuthService } from "src/app/shared/auth-service/auth.service";
import { MenuItem } from "primeng/api";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  //////
  loggedIn: boolean = false;
  name: any;
  usr_id: any;
  cmsLoggin: boolean = false;
  ecLoggin: boolean = false;
  pmuLogin: boolean = false;
  adminLogin: boolean = false;
  csrteamLogin: boolean = false;
  isCms: boolean = false;
  type: any;

  // private roles = {
  //   csr:['material-tied'],
  //   ec:['material-tied'],
  //   admin: ['material-tied'],
  //   csr_team:['material-tied'],
  //   pmu:[],
  //   cms: [],
  // };

  constructor(
    private service: ApiService,
    private authservice: AuthService,
    private router: Router,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.service.status().subscribe(
      (res) => {
        this.loggedIn = res;
        if (this.loggedIn == true) {
          const nam: any = sessionStorage.getItem("userDetail");
          const nam2 = JSON.parse(nam);
          this.name = nam2.name;
          this.type =nam2.type
          console.log(nam2);
          if (this.type === "cms") {
            this.cmsLoggin = true;
            this.ecLoggin = false;
            this.pmuLogin = false;
            this.adminLogin = false;
            this.csrteamLogin = false;
          }  else if (this.type === "csr_team") {
            this.cmsLoggin = false;
            this.ecLoggin = false;
            this.pmuLogin = false;
            this.adminLogin = false;
            this.csrteamLogin = true;
          } else if (this.type === "admin") {
            this.cmsLoggin = false;
            this.ecLoggin = false;
            this.pmuLogin = false;
            this.adminLogin = true;
            this.csrteamLogin = false;
          } else if (this.type === "pmu") {
            this.cmsLoggin = false;
            this.ecLoggin = false;
            this.pmuLogin = true;
            this.adminLogin = false;
            this.csrteamLogin = false;
          }else if (this.type === "csr" || "ec") {
            this.cmsLoggin = false;
            this.ecLoggin = true;
            this.pmuLogin = false;
            this.adminLogin = false;
            this.csrteamLogin = false;
          }


        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  logout() {
    this.authservice.logout();
    this.service.toggleLogin(false);
    this.router.navigate(["login"]);
  }

  donateForm() {
    if (!this.loggedIn) {
      this.router.navigate(["login"]);
    } else {
      this.router.navigate(["donate"]);
    }
  }

  public url: string = "";

  onMenuChange() {
    this.url = this.router.url;
    console.log(this.url);
    this.isActive = true;
  }
  //
  isCollapsed = false;
  hideContent = false;
  @Output() sidebarToggle: EventEmitter<boolean> = new EventEmitter<boolean>();
  currentOpenDropdown: string | null = null;
  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    this.sidebarToggle.emit(this.isCollapsed);
    this.hideContent = !this.hideContent;
  }
  isActive = false;
  isDropdownVisible = false;
  isDropdownOpens: any;
  isDropdownOpen: any;
  isother: any;
  isProjects: any;
  isDonations: any;
  isUsers: any;
  isDropdownOpens1: any;
  toggleDropdown1() {
    this.isDropdownOpens1 = !this.isDropdownOpens1;
  }
  // material() {
  //   this.isDropdownVisible = !this.isDropdownVisible;
  // }
  // cash() {
  //   this.isDropdownOpen = !this.isDropdownOpen;
  // }
  // other() {
  //   this.isother = !this.isother;
  // }
  // onDocumentClick(event: MouseEvent) {
  //   if (!this.elementRef.nativeElement.contains(event.target)) {
  //     this.isDropdownOpens = false;
  //   }
  // }
  // Projects(){
  //   this.isProjects =!this.isProjects;
  // }
  // Donations(){
  //   this.isDonations=!this.isDonations;
  // }
  // Users(){
  //   this.isUsers=!this.isUsers;
  // }

  toggleDropdown(dropdown: string) {
    this.currentOpenDropdown =
      this.currentOpenDropdown === dropdown ? null : dropdown;
    this.isDropdownVisible =
      this.currentOpenDropdown === "material" ? !this.isDropdownVisible : false;
    this.isDropdownOpen =
      this.currentOpenDropdown === "cash" ? !this.isDropdownOpen : false;
    this.isother = this.currentOpenDropdown === "other" ? !this.isother : false;
    this.isProjects =
      this.currentOpenDropdown === "Projects" ? !this.isProjects : false;
    this.isDonations =
      this.currentOpenDropdown === "Donations" ? !this.isDonations : false;
    this.isUsers = this.currentOpenDropdown === "Users" ? !this.isUsers : false;
    this.isCms = this.currentOpenDropdown === "cms" ? !this.isCms : false;

  }
  material() {
    this.toggleDropdown("material");
  }

  cash() {
    this.toggleDropdown("cash");
  }

  other() {
    this.toggleDropdown("other");
  }

  Projects() {
    this.toggleDropdown("Projects");
  }

  Donations() {
    this.toggleDropdown("Donations");
  }

  Users() {
    this.toggleDropdown("Users");
  }
  cms(){
    this.toggleDropdown("cms")
  }

  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isDropdownOpens1 = false;
    }
  }
}
