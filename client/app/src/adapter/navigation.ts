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

  navigate(screen: string, params?: any) {
    this.navigation.navigate(screen, params);
  }
}