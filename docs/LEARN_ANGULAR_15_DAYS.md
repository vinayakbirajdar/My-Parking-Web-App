# Learn Angular in 15 Days — Using Your My Parking Project

This guide teaches you Angular **from zero**, using **your own project** as the examples. No coding experience assumed. Take it one day at a time.

---

## How to Use This Guide

- **One day = one topic.** Do the reading, open the files mentioned, then try the "Try it" task.
- **Always run your app** while learning: `npm start` or `ng serve`, then open `http://localhost:4200`.
- **Change small things** in the code (text, colors) and see what happens. That’s how you learn.

---

# Week 1: Basics — What Is Angular and How Your App Runs

---

## Day 1: What Is Angular? Run Your App

### What you’ll learn
- What Angular is (in one sentence).
- How to run your project and see it in the browser.

### In simple words

**Angular** is a framework to build **web applications** (websites that feel like apps: login, buttons, forms, multiple pages). You write code in **TypeScript** and **HTML**, and Angular turns it into a running app in the browser.

Your **My Parking** project is already an Angular app. You don’t have to build it from scratch; you’ll learn by **reading and changing** it.

### Three ideas to remember

1. **Component** = one piece of the screen (e.g. login form, dashboard, sidebar).
2. **Template** = the HTML that shows what that piece looks like.
3. **App** = many components working together.

### Run your app

1. Open a terminal in your project folder.
2. Run:
   ```bash
   npm install
   npm start
   ```
   (Or `ng serve` if you use Angular CLI.)
3. Open the browser at: **http://localhost:4200**
4. You should see your app (login page). Click around: login (e.g. email `vsb@gmail.com`, password `123456`), then Home, Profile, etc.

### Try it

- Change the URL to `http://localhost:4200/home`. Then to `http://localhost:4200/login`. See how the screen changes.
- Bookmark this: **your app runs in the browser; the code you edit is what creates that screen.**

---

## Day 2: Project Folders and the Entry Point

### What you’ll learn
- Where the main code lives.
- How the app **starts** (entry point).

### In simple words

The app doesn’t start from “every file at once.” It starts from **one file** that loads the rest. That file is **`src/main.ts`**.

### Open this file: `src/main.ts`

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
```

**What this means (simple):**

- **import** = “get this thing from another file.”
- **bootstrapApplication** = “start the Angular app.”
- **AppComponent** = the **root component** (the top-level piece of the app).
- **appConfig** = settings (e.g. routing).

So: **main.ts** says: “Start the app using `AppComponent` and `appConfig`.”

### Where things are (simplified)

| Folder / file      | What it is for |
|--------------------|----------------|
| `src/main.ts`      | Starts the app |
| `src/app/app.component.ts` | Root component |
| `src/app/app.routes.ts`    | Which URL shows which page |
| `src/app/screens/`         | Each page (home, login, profile, etc.) |
| `src/app/Common/`         | Reusable pieces (buttons, inputs) |

### Try it

- In `src/main.ts`, add a space or a comment, save, and see that the app still runs (to confirm you’re editing the right project).
- In the project folder, click through: `src` → `app` → `screens` → `home`. You’ll use these files on Day 3.

---

## Day 3: Your First Component — The Home Page

### What you’ll learn
- A component = **TypeScript class** + **HTML template** + (optional) **styles**.
- How the Home page is built.

### In simple words

Every **screen** (Home, Login, Profile) is a **component**. A component has:

1. A **class** (`.ts`): data and actions (e.g. “when the user clicks, do this”).
2. A **template** (`.html`): what the user sees (buttons, text, images).
3. **Styles** (`.scss`): how it looks (colors, spacing).

### Open: `src/app/screens/home/home.component.ts`

```ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  showMessage = false;

  showGreeting() {
    this.showMessage = true;
  }
}
```

**What each part does:**

- **@Component({ ... })** = “this class is an Angular component.”
- **selector: 'app-home'** = “to put this component on the page, use the tag `<app-home></app-home>`.”
- **templateUrl** = “the HTML is in `home.component.html`.”
- **styleUrl** = “the styles are in `home.component.scss`.”
- **showMessage = false** = a variable the template can use.
- **showGreeting()** = a function; when called, it sets `showMessage` to `true`.

### Open: `src/app/screens/home/home.component.html`

You’ll see normal HTML: `<div>`, `<h5>`, “Dashboard”, “Select Your Vehicle”, cards for Heavy Vehicle, Bike, Car, etc. This is the **template** of the Home component. Angular puts this HTML on the page when you’re on the Home route.

### Try it

1. In `home.component.html`, find the line with “Welcome, **Vinayak**”. Change **Vinayak** to your name. Save and see the change in the browser.
2. Find “Manage your parking efficiently” and change it to “My first Angular change.” Save and refresh (or rely on live reload).

You’ve just edited a **component template**. The `.ts` file is the **component class**; the `.html` file is the **template**.

---

## Day 4: Data Binding — Show Data From the Class in the Template

### What you’ll learn
- **Interpolation**: show a variable from the class in the HTML using `{{ }}`.
- How the template and the class stay in sync.

### In simple words

**Data binding** = connect the **component class** (data) to the **template** (what’s on screen). The simplest form is **interpolation**: `{{ variableName }}` in the HTML shows the value of `variableName` from the class.

### Example in your project

In **home.component.ts** you have:

```ts
showMessage = false;
```

If in **home.component.html** you had:

```html
<p>Show message is: {{ showMessage }}</p>
```

the page would show “Show message is: false” (or true after `showGreeting()` runs).

### Try it

1. In **home.component.ts**, add a variable:
   ```ts
   userName = 'Vinayak';
   ```
2. In **home.component.html**, find “Welcome, **Vinayak**” and replace the name with:
   ```html
   Welcome, <strong>{{ userName }}</strong>
   ```
3. Save. The page should show “Welcome, Vinayak” (from the variable).
4. In the class, change to `userName = 'Your Name'` and save again. The screen should update.

You just used **interpolation** to bind class data to the template.

---

## Day 5: Events — Clicks and Actions

### What you’ll learn
- How to run code when the user **clicks** something.
- **Event binding**: `(eventName)="methodName()"`.

### In simple words

To “do something when the user clicks,” you put the action in the **component class** (a method) and in the **template** you say: “when this element is clicked, call that method.” In Angular you write:

```html
(click)="methodName()"
```

So: **round brackets** = event; **quotes** = code to run (usually a method).

### Example in your project

**Login** page uses a button that calls `onSubmit` when the form is submitted:

In **login.component.html**:

```html
<app-core-button label="SUBMIT" [onClick]="onSubmit" ...>
```

In **login.component.ts**:

```ts
onSubmit = () => {
  console.log('Submit clicked');
  const email = this.loginForm.value.email;
  const password = this.loginForm.value.password;
  if (email === 'vsb@gmail.com' && password === '123456') {
    this.router.navigate(['home']);
  } else {
    alert('Wrong Email or password');
  }
};
```

So: **click Submit** → `onSubmit` runs → it checks email/password and either goes to `home` or shows an alert.

### Try it

1. On the **Home** page template, add a button somewhere at the top (inside the first `div`):
   ```html
   <button type="button" (click)="showGreeting()">Click me</button>
   ```
2. Add a line that shows only when `showMessage` is true:
   ```html
   <p *ngIf="showMessage">Hello! You clicked the button.</p>
   ```
3. Save, go to Home, click the button. You should see “Hello! You clicked the button.”  
   (You’re using **event binding** `(click)` and a simple **directive** `*ngIf`; we’ll do more directives on Day 7.)

---

## Day 6: Reusable Components — Buttons and Inputs

### What you’ll learn
- One component can **use another** by putting its **selector** in the template.
- **Inputs** (`@Input`) = pass data *into* a component (e.g. button label).

### In simple words

Your app has **reusable** pieces: `app-core-button`, `app-core-input`, `app-core-title`. The **login** page uses them. So:

- **Parent** = Login component.
- **Child** = e.g. CoreButtonComponent. The parent puts `<app-core-button ...>` in its template and passes **inputs** like `label="SUBMIT"`.

### Open: `src/app/Common/core-button/core-button.component.ts`

```ts
@Input() label: string = 'Button';
@Input() type: 'button' | 'submit' = 'button';
@Input() disabled: boolean = false;
@Input() width: string = '100%';
@Input() onClick: () => void = () => { };
```

**Meaning:**

- **@Input()** = “the parent can set this from the template.”
- So the parent can write: `<app-core-button label="SUBMIT" width="50%">` and the button shows “SUBMIT” and is 50% width.

### In login.component.html you have:

```html
<app-core-button label="SUBMIT" [onClick]="onSubmit" type="submit" width="100%">
</app-core-button>
```

So: the **Login** component uses the **CoreButton** component and passes:
- `label="SUBMIT"`
- `[onClick]="onSubmit"` (the function to call when clicked)
- `type="submit"`, `width="100%"`

### Try it

1. On the **Login** page, change the button label from `"SUBMIT"` to `"Sign In"`. Save and see the button text change.
2. Find the other button: `label="CREATE ACCOUNT"`. Change it to `"Register"`.

You’re reusing the same **core-button** component with different **inputs**.

---

## Day 7: Directives — *ngIf and *ngFor

### What you’ll learn
- **Directives** = instructions in the template that change the DOM (show/hide, repeat).
- **\*ngIf** = show an element only when a condition is true.
- **\*ngFor** = repeat an element for each item in a list.

### In simple words

- **\*ngIf="condition"** → add or remove the element from the page based on `condition`.
- **\*ngFor="let item of list"** → create one copy of the element for each `item` in `list`.

### Example: *ngIf

You already used it on Day 5:

```html
<p *ngIf="showMessage">Hello! You clicked the button.</p>
```

Only when `showMessage` is true does this paragraph appear.

### Example: *ngFor (in your project style)

Imagine in **home.component.ts** you have:

```ts
recentActivities = [
  { vehicle: '🚗 MH12 AB 1234', type: 'Car', action: 'Parked', time: '10:32 AM' },
  { vehicle: '🏍 MH14 XY 9988', type: 'Bike', action: 'Exited', time: '10:20 AM' },
];
```

In the template you could replace the three hard-coded “activity” divs with:

```html
<div class="activity-item mb-3" *ngFor="let act of recentActivities">
  <span>{{ act.vehicle }}</span>
  <small class="text-muted d-block">{{ act.type }} • {{ act.action }} • {{ act.time }}</small>
</div>
```

Then one block of HTML is repeated for each item in `recentActivities`.

### Try it

1. In **home.component.ts**, add:
   ```ts
   recentActivities = [
     { vehicle: '🚗 MH12 AB 1234', type: 'Car', action: 'Parked', time: '10:32 AM' },
     { vehicle: '🏍 MH14 XY 9988', type: 'Bike', action: 'Exited', time: '10:20 AM' },
     { vehicle: '🚚 TR-09 7766', type: 'Heavy', action: 'Parked', time: '10:05 AM' },
   ];
   ```
2. In **home.component.html**, in the “Recent Activity” card, replace the three separate `activity-item` divs with the single `*ngFor` block above.
3. Save and check that you still see three activities. Then in the class add a fourth object to `recentActivities` and see a fourth row appear.

You’ve used **\*ngFor** to render a list from data.

---

# Week 2: Routing, Forms, and a Bit More

---

## Day 8: Routing — How URLs Change the Page

### What you’ll learn
- **Routing** = which URL shows which component.
- Your app’s routes are in `app.routes.ts`.

### In simple words

When you go to `/login`, Angular shows the Login component. When you go to `/home`, it shows the Home component. The **router** reads the URL and picks the right component. That list of “path → component” is in **routes**.

### Open: `src/app/app.routes.ts`

```ts
export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'wallet', component: WalletComponent },
      // ...
    ]
  },
  { path: '**', redirectTo: 'login' }
];
```

**Meaning:**

- **path: 'login'** → URL `/login` shows `LoginComponent`.
- **path: 'home'** → URL `/home` shows `HomeComponent`.
- **redirectTo: 'login'** → going to `/` sends you to `/login`.
- **path: '**'** → any unknown URL sends you to `login`.

**Layouts:** `AuthLayoutComponent` wraps the login page (no sidebar). `MainLayoutComponent` wraps home, profile, wallet, etc. (with sidebar). So the same “route list” is used with different wrappers.

### Try it

1. Manually type in the browser: `http://localhost:4200/profile`. You should see the Profile page with the sidebar.
2. Open **app.routes.ts** and add a new route (copy an existing one and change path and component), or just read the file and say out loud: “When I go to /home, Angular loads HomeComponent.”

---

## Day 9: Navigation — router.navigate and Links

### What you’ll learn
- **Programmatic navigation**: in code, e.g. `this.router.navigate(['home'])`.
- **Link navigation**: `<a routerLink="/home">` in the template.

### In simple words

- After login, the app **navigates in code**: `this.router.navigate(['home'])` in **login.component.ts**.
- In the sidebar or menu, you use **routerLink** so a click goes to a route without full page reload.

### In login.component.ts you have:

```ts
constructor(private router: Router) { }
// ...
if (email === 'vsb@gmail.com' && password === '123456') {
  this.router.navigate(['home']);
}
```

So: **Router** is injected; when login succeeds, you call **navigate** with the path `['home']` (i.e. `/home`).

### In your sidebar (or layout) you’ll have links like:

```html
<a routerLink="/home">Home</a>
<a routerLink="/profile">Profile</a>
```

**routerLink** is the Angular way to link to a route.

### Try it

1. In **login.component.ts**, temporarily change `this.router.navigate(['home'])` to `this.router.navigate(['profile'])`. Save, log in again, and see that you land on Profile instead of Home. Change it back after.
2. Find where the sidebar or menu defines links (e.g. in **sidebar.component.html** or **main-layout**). Check that they use `routerLink` (e.g. `routerLink="/home"`).

---

## Day 10: Forms — FormGroup and FormControl (Login)

### What you’ll learn
- **Reactive Forms**: form state lives in the class as `FormGroup` and `FormControl`.
- How the login form is wired: inputs bound to controls, submit calls `onSubmit`.

### In simple words

Instead of reading the input values one by one, you define a **form model** in the class (one control per field). The template binds inputs to these controls. When the user submits, you read `formGroup.value` or each control’s value.

### Open: `src/app/screens/login/login.component.ts`

```ts
loginForm = new FormGroup({
  email: new FormControl(''),
  password: new FormControl('')
});

onSubmit = () => {
  const email = this.loginForm.value.email;
  const password = this.loginForm.value.password;
  // ...
};
```

- **FormGroup** = the whole form (email + password).
- **FormControl** = one field (e.g. email). `''` is the default value.
- **loginForm.value** = object with `email` and `password` (current values).

In **login.component.html** the inputs are bound to these controls (e.g. `[control]="loginForm.controls['email']"` in `app-core-input`). So when the user types, the form model updates; when they submit, `onSubmit` reads from the model.

### Try it

1. In `onSubmit`, add: `console.log(this.loginForm.value);` and open the browser DevTools (F12) → Console. Submit the form and see the object with email and password.
2. Change the default email in the class: `email: new FormControl('test@test.com')`. Save and open the login page; the email field might show that value (if your core-input uses the control’s value).

---

## Day 11: The Root Component and router-outlet

### What you’ll learn
- **AppComponent** is the root; its template is just `<router-outlet></router-outlet>`.
- **router-outlet** = place where the router **inserts** the component for the current route.

### In simple words

The root component doesn’t draw the whole page. It only says: “put the current route’s component **here**.” So when the route is `login`, the router puts the Login component inside `<router-outlet>`. When the route is `home`, it puts the Home component there.

### Open: `src/app/app.component.ts`

```ts
template: `<router-outlet></router-outlet>`
```

So the whole app is: **one outlet** that swaps between Login, Home, Profile, etc., depending on the URL.

### Layouts

- **AuthLayoutComponent**: template probably has only `<router-outlet>` (and maybe a logo). So on `/login` you see auth layout + login form.
- **MainLayoutComponent**: template has **sidebar + `<router-outlet>`**. So on `/home` you see sidebar + home content.

So: **one** outlet in the root; **layouts** wrap each area and have their own outlet for their children.

### Try it

- Open **main-layout** and **auth-layout** templates. Find where `<router-outlet>` is. That’s where the child route (home, login, etc.) is inserted.

---

## Day 12: Styles — Global vs Component

### What you’ll learn
- **Global styles**: `src/styles.scss` (and maybe `assets/app-styles/`) apply to the whole app.
- **Component styles**: `home.component.scss` apply only to that component (Angular scopes them).

### In simple words

- In **home.component.scss** you can use class names that only affect the Home template. Angular adds a unique attribute so they don’t leak to other components.
- In **styles.scss** or **app-styles** you define variables (e.g. `--app_background_color`) or global classes that many components can use.

### Your project

- Login uses `var(--app_background_color)` in the template — that variable is likely in **app-styles** (e.g. **color.scss**).
- **home.component.scss** has rules for `.vehicle-card`, `.activity-item`, etc.; they apply only to the Home view.

### Try it

1. Open **src/app/screens/home/home.component.scss**. Change a color or padding (e.g. for `.vehicle-card`). Save and see only the Home page change.
2. Open **src/app/assets/app-styles/color.scss** (or wherever `--app_background_color` is). Change that value and see where in the app the background (or other use of that variable) changes.

---

## Day 13: Putting It Together — Trace One Flow

### What you’ll learn
- Trace the full flow: URL → routes → layout → component → template and class.

### In simple words

You open `/home`. The router:
1. Matches the main layout (path `''`).
2. Looks at the rest of the URL: `home` → child route `HomeComponent`.
3. Main layout’s template has sidebar + `<router-outlet>`. The router puts `HomeComponent` in that outlet.
4. Home component’s template (HTML) and class (data/methods) run. You see the dashboard.

You click Login and submit with correct credentials. The login component’s `onSubmit` runs and calls `this.router.navigate(['home'])`. The router changes the URL to `/home` and the same steps as above happen, so you see the home page.

### Try it

1. Draw on paper: “URL /home” → “Router” → “MainLayout” → “Sidebar + Outlet” → “HomeComponent”.
2. In code, put a `console.log('HomeComponent loaded')` in the **constructor** of **home.component.ts**. Reload and go to `/home`; see the log in the console. That confirms when the component is created.

---

## Day 14: Small Project — Add One New Thing

### What you’ll learn
- Use everything you’ve seen: component, binding, event, maybe *ngIf/*ngFor, and routing.

### Idea: “Favourite” on the Home page

1. In **home.component.ts** add something like:
   - `favouriteVehicle = '';`
   - `setFavourite(name: string) { this.favouriteVehicle = name; }`
2. In **home.component.html**, on each vehicle card, add a button or click:
   - `(click)="setFavourite('Car')"` (and Bike, Heavy).
3. Show the chosen one somewhere:
   - `<p *ngIf="favouriteVehicle">Your favourite: {{ favouriteVehicle }}</p>`

Or: add a new **route** (e.g. `settings`) and a simple **SettingsComponent** that only shows a title. Register the route in **app.routes.ts** and add a link in the sidebar. That practices routing and components.

### Try it

Pick one small change (favourite, new page, or “welcome” message that changes when you type in a new variable). Implement it using:
- one new variable or method in the class,
- interpolation or *ngIf in the template,
- and optionally a (click) or a new route.

---

## Day 15: What Next?

### You’ve seen

- **Components**: class + template + styles.
- **Data binding**: `{{ }}`, `(click)`, `[property]`.
- **Directives**: `*ngIf`, `*ngFor`.
- **Reusable components** and **@Input()**.
- **Routing**: routes, `routerLink`, `router.navigate`, `router-outlet`.
- **Reactive forms**: `FormGroup`, `FormControl`, reading values in submit.
- **Where things live**: main.ts, app component, layouts, screens, Common.

### Next steps (when you’re ready)

1. **Services** — move “login check” or “list of activities” into a **service** and inject it in components (see Angular docs: “Services”).
2. **HTTP** — call a real API (e.g. `HttpClient.get(...)`) to load data instead of hard-coding.
3. **Guards** — protect routes so only logged-in users can open `/home` (see “Route guards”).
4. **More forms** — validation (required, email format) with Reactive Forms.

Use your **My Parking** app as the playground: add a small feature each week using one of the above.

---

## Quick Reference (Your Project)

| Concept        | Where in your project                    |
|----------------|-------------------------------------------|
| Entry point    | `src/main.ts`                            |
| Root component | `src/app/app.component.ts`               |
| Routes         | `src/app/app.routes.ts`                  |
| Page components| `src/app/screens/home`, `login`, etc.     |
| Reusable UI    | `src/app/Common/core-button`, core-input  |
| Layouts        | `src/app/layouts/auth-layout`, main-layout |
| Global styles  | `src/styles.scss`, `app/assets/app-styles` |

Good luck — you’ve got a real project to learn on; keep changing it and observing what happens.
