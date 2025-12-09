from sqlalchemy.orm import Session
from industry_app.models.product_model import Product

# Create Product
def create_product(db: Session, name: str, sku: str, description: str = ""):
    new_product = Product(name=name, sku=sku, description=description)
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product

# Get all Products
def get_products(db: Session):
    return db.query(Product).all()

# Get by ID
def get_product(db: Session, product_id: int):
    return db.query(Product).filter(Product.id == product_id).first()

# Update Product
def update_product(db: Session, product_id: int, name: str, sku: str, description: str):
    product = get_product(db, product_id)
    if product:
        product.name = name
        product.sku = sku
        product.description = description
        db.commit()
        db.refresh(product)
    return product

# Delete Product
def delete_product(db: Session, product_id: int):
    product = get_product(db, product_id)
    if product:
        db.delete(product)
        db.commit()
    return product
