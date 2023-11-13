class Category {
  constructor({ maxAmount, name, userID, image }) {
    this.maxAmount = maxAmount;
    this.name = name;
    this.userID = userID;
    this.image = image;
  }

  getAddPayload() {
    return {
      maxAmount: this.maxAmount,
      name: this.name,
      userID: this.userID,
      image: this.image,
    };
  }
}

export default Category;
