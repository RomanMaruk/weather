import {
  ComponentRef,
  Directive,
  DoCheck,
  EmbeddedViewRef,
  OnChanges,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  inject,
  input,
} from '@angular/core';
import { LoaderComponent } from '../components/loader/loader.component';

@Directive({
  selector: '[appLoading]',
  standalone: true,
})
export class LoadingDirective implements OnInit, OnChanges, DoCheck {
  private readonly templateRef = inject(TemplateRef);
  private readonly vcRef = inject(ViewContainerRef);
  appLoading = input(false);
  templateView!: EmbeddedViewRef<any>;
  loaderRef!: ComponentRef<LoaderComponent>;

  ngOnInit() {
    this.templateView = this.templateRef.createEmbeddedView({});
    this.loaderRef = this.vcRef.createComponent(LoaderComponent, {
      injector: this.vcRef.injector,
      projectableNodes: [this.templateView.rootNodes],
    });

    this.loaderRef.setInput('loading', this.appLoading());
  }

  ngOnChanges() {
    this.loaderRef?.setInput('loading', this.appLoading());
  }

  ngDoCheck() {
    this.templateView?.detectChanges();
  }
}
