from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'dev-only-not-for-production'
DEBUG = True
ALLOWED_HOSTS = ['*']

INSTALLED_APPS = ['converter']

MIDDLEWARE = ['django.middleware.common.CommonMiddleware']

ROOT_URLCONF = 'project.urls'

TEMPLATES = [{
    'BACKEND': 'django.template.backends.django.DjangoTemplates',
    'DIRS': [],
    'APP_DIRS': True,
    'OPTIONS': {'context_processors': []},
}]

WSGI_APPLICATION = 'project.wsgi.application'

STATIC_URL = '/static/'

# Allow large PDF uploads (up to 200 MB)
FILE_UPLOAD_MAX_MEMORY_SIZE = 200 * 1024 * 1024
DATA_UPLOAD_MAX_MEMORY_SIZE = 200 * 1024 * 1024
