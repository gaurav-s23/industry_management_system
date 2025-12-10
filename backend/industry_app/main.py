from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from industry_app.db import get_db, create_tables

# ----------------- Initialize App -----------------
app = FastAPI(title="Industry Production & Inventory API 🚀")

# ----------------- Enable CORS for Frontend -----------------
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    create_tables()


@app.get("/")
def root():
    return {"message": "Industry App Backend Running 🚀"}


# ======================================================
#                      MATERIAL API
# ======================================================

from industry_app.services.material_service import (
    create_material, get_materials, get_material,
    update_material, delete_material
)

from pydantic import BaseModel

class MaterialInput(BaseModel):
    name: str
    unit: str
    description: str = ""

@app.post("/materials")
def add_material(data: MaterialInput, db: Session = Depends(get_db)):
    return create_material(db, data.name, data.unit, data.description)

@app.get("/materials")
def all_materials(db: Session = Depends(get_db)):
    return get_materials(db)

@app.get("/materials/{material_id}")
def get_one(material_id: int, db: Session = Depends(get_db)):
    return get_material(db, material_id)

@app.put("/materials/{material_id}")
def update_one(material_id: int, name: str, unit: str, description: str = "", db: Session = Depends(get_db)):
    return update_material(db, material_id, name, unit, description)

@app.delete("/materials/{material_id}")
def remove(material_id: int, db: Session = Depends(get_db)):
    return delete_material(db, material_id)


# ======================================================
#                      PRODUCT API
# ======================================================

from industry_app.services.product_service import (
    create_product, get_products, get_product,
    update_product, delete_product
)

@app.post("/products")
def add_product(name: str, sku: str, description: str = "", db: Session = Depends(get_db)):
    return create_product(db, name, sku, description)

@app.get("/products")
def all_products(db: Session = Depends(get_db)):
    return get_products(db)

@app.get("/products/{product_id}")
def get_one_product(product_id: int, db: Session = Depends(get_db)):
    return get_product(db, product_id)

@app.put("/products/{product_id}")
def update_one_product(product_id: int, name: str, sku: str, description: str = "", db: Session = Depends(get_db)):
    return update_product(db, product_id, name, sku, description)

@app.delete("/products/{product_id}")
def remove_product(product_id: int, db: Session = Depends(get_db)):
    return delete_product(db, product_id)


# ======================================================
#                  PRODUCTION ORDERS API
# ======================================================

from industry_app.services.production_service import (
    create_order, get_orders, get_order, update_order_status
)

@app.post("/orders")
def add_order(product_id: int, qty: int, start_date: str, due_date: str, worker_id: int = None, db: Session = Depends(get_db)):
    return create_order(db, product_id, qty, start_date, due_date, worker_id)

@app.get("/orders")
def all_orders(db: Session = Depends(get_db)):
    return get_orders(db)

@app.get("/orders/{order_id}")
def one_order(order_id: int, db: Session = Depends(get_db)):
    return get_order(db, order_id)

@app.put("/orders/{order_id}")
def change_status(order_id: int, status: str, db: Session = Depends(get_db)):
    return update_order_status(db, order_id, status)


# ======================================================
#                  PRODUCTION LOGS API
# ======================================================

from industry_app.services.production_service import (
    add_production_log, get_logs
)

@app.post("/logs")
def add_log(order_id: int, product_id: int, log_date: str, qty: int, notes: str = "", db: Session = Depends(get_db)):
    return add_production_log(db, order_id, product_id, log_date, qty, notes)

@app.get("/logs")
def all_logs(db: Session = Depends(get_db)):
    return get_logs(db)


# ======================================================
#                      WORKER API
# ======================================================

from industry_app.services.worker_service import (
    create_worker, get_workers, get_worker
)

@app.post("/workers")
def add_worker(name: str, role: str = "", phone: str = "", db: Session = Depends(get_db)):
    return create_worker(db, name, role, phone)

@app.get("/workers")
def all_workers(db: Session = Depends(get_db)):
    return get_workers(db)

@app.get("/workers/{worker_id}")
def one_worker(worker_id: int, db: Session = Depends(get_db)):
    return get_worker(db, worker_id)


# ======================================================
#                      REPORTS API
# ======================================================

from industry_app.services.report_service import (
    low_stock_materials,
    completed_orders,
    product_stock_summary
)

@app.get("/reports/low-stock")
def get_low_stock_materials(db: Session = Depends(get_db)):
    return low_stock_materials(db)

@app.get("/reports/completed-orders")
def get_completed_orders(db: Session = Depends(get_db)):
    return completed_orders(db)

@app.get("/reports/product-stock")
def get_product_stock(db: Session = Depends(get_db)):
    return product_stock_summary(db)
