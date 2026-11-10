"""Environment-driven configuration for the HelpDesk AI API."""

import os
from dataclasses import dataclass


@dataclass(frozen=True)
class Settings:
    app_name: str = os.getenv("APP_NAME", "HelpDesk AI API")
    environment: str = os.getenv("APP_ENV", "development")
    log_level: str = os.getenv("LOG_LEVEL", "INFO").upper()


settings = Settings()
