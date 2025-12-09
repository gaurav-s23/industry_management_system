from sqlalchemy.orm import Session
from industry_app.models.production_order_model import ProductionOrder

# Create order
def create_order(db: Session, product_id: int, planned_quantity: int, start_date, due_date, worker_id: int = None):
    order = ProductionOrder(
        product_id=product_id,
        planned_quantity=planned_quantity,
        start_date=start_date,
        due_date=due_date,
        assigned_worker_id=worker_id,
        status="pending"
    )
    db.add(order)
    db.commit()
    db.refresh(order)
    return order

# Get all orders
def get_orders(db: Session):
    return db.query(ProductionOrder).all()

# Get one order
def get_order(db: Session, order_id: int):
    return db.query(ProductionOrder).filter(ProductionOrder.id == order_id).first()

# Update status
def update_order_status(db: Session, order_id: int, status: str):
    order = get_order(db, order_id)
    if order:
        order.status = status
        db.commit()
        db.refresh(order)
    return order




from industry_app.models.production_log_model import ProductionLog
from industry_app.models.product_model import Product

# Add daily production log + stock update
def add_production_log(db: Session, order_id: int, product_id: int, log_date, qty: int, notes: str = ""):

    log_entry = ProductionLog(
        production_order_id=order_id,
        product_id=product_id,
        log_date=log_date,
        quantity_produced=qty,
        notes=notes
    )
    db.add(log_entry)

    # Auto Update Stock
    product = db.query(Product).filter(Product.id == product_id).first()
    if product:
        product.current_stock += qty

    db.commit()
    db.refresh(log_entry)
    return log_entry


# Get all production logs
def get_logs(db: Session):
    return db.query(ProductionLog).all()
