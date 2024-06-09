from fastapi import FastAPI
import config as settings

app = FastAPI(
    title=settings.PROJECT_NAME,
    description=settings.DESCRIPTION,
)


@app.get("/health")
def health():
    return {"status": "ok"}
