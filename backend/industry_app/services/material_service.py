from sqlalchemy.orm import Session
from industry_app.models.material_model import Material

# Create material
def create_material(db: Session, name: str, unit: str, description: str = ""):
    new_material = Material(name=name, unit=unit, description=description)
    db.add(new_material)
    db.commit()
    db.refresh(new_material)
    return new_material

# Get all materials
def get_materials(db: Session):
    return db.query(Material).all()

# Get by ID
def get_material(db: Session, material_id: int):
    return db.query(Material).filter(Material.id == material_id).first()

# Update
def update_material(db: Session, material_id: int, name: str, unit: str, description: str):
    material = get_material(db, material_id)
    if material:
        material.name = name
        material.unit = unit
        material.description = description
        db.commit()
        db.refresh(material)
    return material

# Delete
def delete_material(db: Session, material_id: int):
    material = get_material(db, material_id)
    if material:
        db.delete(material)
        db.commit()
    return material
