from sqlalchemy.orm import Session
from industry_app.models.material_model import Material
from industry_app.models.production_order_model import ProductionOrder
from industry_app.models.product_model import Product

# 1️⃣ Low stock materials report
def low_stock_materials(db: Session):
    return db.query(Material).filter(Material.current_stock <= Material.reorder_level).all()

# 2️⃣ Completed Production Orders
def completed_orders(db: Session):
    return db.query(ProductionOrder).filter(ProductionOrder.status == "completed").all()

# 3️⃣ Total Product Stock Summary
def product_stock_summary(db: Session):
    return db.query(Product).all()
