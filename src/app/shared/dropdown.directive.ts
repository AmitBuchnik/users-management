import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    constructor() {
    }

    @HostBinding('class.open')
    isOpen = false;

    @HostListener('click', ['$event.target'])
    toggleOpen() {
        this.isOpen = !this.isOpen;
    }

    // @HostListener('document:click', ['$event.target'])
    // close() {
    //     if (this.isOpen) {
    //         this.isOpen = false;
    //     }
    // }
}

