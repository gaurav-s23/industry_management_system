from sqlalchemy import Column, Integer, String, Date, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from industry_app.db import Base

class ProductionOrder(Base):
    __tablename__ = "production_orders"

    id = Column(Integer, primary_key=True, index=True)
    
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    assigned_worker_id = Column(Integer, ForeignKey("workers.id"), nullable=True)

    planned_quantity = Column(Integer, nullable=False)
    start_date = Column(Date, nullable=False)
    due_date = Column(Date, nullable=False)

    status = Column(String, default="pending")  # pending, in_progress, completed, cancelled

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    product = relationship("Product")
    worker = relationship("Worker", backref="production_orders")
