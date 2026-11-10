"""FastAPI application entry point for HelpDesk AI."""

import logging
import logging.config

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from app.core.config import settings

logging.config.dictConfig(
    {
        "version": 1,
        "disable_existing_loggers": False,
        "formatters": {
            "standard": {
                "format": "%(asctime)s %(levelname)s %(name)s %(message)s",
            }
        },
        "handlers": {
            "console": {
                "class": "logging.StreamHandler",
                "formatter": "standard",
            }
        },
        "root": {"handlers": ["console"], "level": settings.log_level},
    }
)

logger = logging.getLogger(__name__)
app = FastAPI(
    title=settings.app_name,
    description="Development API foundation for HelpDesk AI.",
    version="0.1.0",
)


@app.get("/health", tags=["health"], summary="Check API liveness")
def health() -> dict[str, str]:
    """Return a lightweight liveness response without checking external services."""
    return {"status": "ok", "service": "helpdesk-ai-api"}


@app.exception_handler(Exception)
async def unexpected_error_handler(request: Request, exc: Exception) -> JSONResponse:
    """Log unexpected failures while returning a non-sensitive client response."""
    logger.exception("Unhandled request error on %s %s", request.method, request.url.path)
    return JSONResponse(
        status_code=500,
        content={"detail": "An unexpected server error occurred."},
    )
