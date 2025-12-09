from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from industry_app.db import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    sku = Column(String, unique=True, nullable=False)  # Stock Keeping Unit
    description = Column(String, nullable=True)
    current_stock = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
