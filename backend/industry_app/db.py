from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# ---------------------------------------------------
# Database URL
# ---------------------------------------------------
DATABASE_URL = "sqlite:///./industry.db"
# ./ ka matlab current folder me industry.db banega

# ---------------------------------------------------
# Create Engine
# ---------------------------------------------------
# connect_args is required for SQLite in FastAPI environment
engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)

# ---------------------------------------------------
# Session Local
# ---------------------------------------------------
# Har API request ke liye new DB session milega
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# ---------------------------------------------------
# Base class
# ---------------------------------------------------
# Saare models is Base ko inherit karenge
Base = declarative_base()


# ---------------------------------------------------
# FastAPI dependency
# ---------------------------------------------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ---------------------------------------------------
# Create Tables function
# ---------------------------------------------------
# Ye models ko read karega aur DB me unke tables banayega
def create_tables():
    import industry_app.models  # ensure models are imported
    Base.metadata.create_all(bind=engine)
