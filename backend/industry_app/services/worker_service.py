from sqlalchemy.orm import Session
from industry_app.models.worker_model import Worker

def create_worker(db: Session, name: str, role: str = "", phone: str = ""):
    worker = Worker(name=name, role=role, phone=phone)
    db.add(worker)
    db.commit()
    db.refresh(worker)
    return worker

def get_workers(db: Session):
    return db.query(Worker).all()

def get_worker(db: Session, worker_id: int):
    return db.query(Worker).filter(Worker.id == worker_id).first()
