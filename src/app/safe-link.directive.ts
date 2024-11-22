import { Directive, ElementRef, inject, input } from "@angular/core";

@Directive({
    selector: 'a[appSafeLink]',
    standalone: true,
    host: {
        '(click)': 'onConfirmLeavePage($event)'
    }
})
export class SafeLinkDirective {
    queryParam = input('myapp', {alias: 'appSafeLink'});
    private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

    constructor() {
        console.log('SafeLinkDirective is active!');
    }

    onConfirmLeavePage(event: MouseEvent) {
        const wantsToLeave = window.confirm('Do you want to leave the app?');

        if(wantsToLeave){
            // const address = (event.target as HTMLAnchorElement).href;
            const address =  this.hostElementRef.nativeElement.href;
            // (event.target as HTMLAnchorElement).href = address + '?from=' + this.queryParam();
            this.hostElementRef.nativeElement.href = address + '?from=' + this.queryParam();
            return;
        }

        event.preventDefault();
    }
}