import { Directive, ElementRef, Input, OnInit, HostListener, HostBinding } from '@angular/core';

@Directive({
    selector: '[addtoList]'
})
export class AddToListDirective implements OnInit {
    @Input('addtoList') modalId: string;
    private el: HTMLElement;

    // userId: number;
    // UserName: string;
    // id: number;
    // title: string;
    // body: string;

    constructor(refElement: ElementRef) {
        this.el = refElement.nativeElement;
    }

    ngOnInit(): void {
        // this.el.addEventListener('click', (e) => {
        //     this.$(`#${this.modalId}`).modal({});
        // });
    }

    @HostListener('click', ['$event.target'])
    onClickModal() {

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