from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from industry_app.db import Base

class Material(Base):
    __tablename__ = "materials"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    unit = Column(String, nullable=False)
    description = Column(String, nullable=True)
    current_stock = Column(Integer, default=0)
    reorder_level = Column(Integer, default=0)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
