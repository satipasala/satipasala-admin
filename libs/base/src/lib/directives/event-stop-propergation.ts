import {Directive, HostListener} from "@angular/core";

@Directive({
  selector: "[event-stop-propagation]"
})
export class EventStopPropagationDirective
{
  @HostListener("click", ["$event"])
  public onClick(event: any): void
  {
    event.stopPropagation();
  }
}
