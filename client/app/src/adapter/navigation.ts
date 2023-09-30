export class Navigation {
  constructor(private readonly navigation: any) { }

  reset() {
    this.navigation.reset({
      index: 0,
      routes: [{ name: "ProductCatalog" }],
    });
  }

  goBack() {
    this.navigation.goBack();
  }

  navigate(screen: string) {
    this.navigation.navigate(screen);
  }
}