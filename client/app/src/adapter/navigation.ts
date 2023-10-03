export class Navigation {
  constructor(private readonly navigation: any) { }

  clean(to: string) {
    this.navigation.reset({
      index: 0,
      routes: [{ name: to }],
    });
  }

  goBack() {
    this.navigation.goBack();
  }

  navigate(screen: string) {
    this.navigation.navigate(screen);
  }
}