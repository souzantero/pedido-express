export class Navigator {
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

  goToCreateOrder() {
    this.navigation.navigate("CreateOrder");
  }
}