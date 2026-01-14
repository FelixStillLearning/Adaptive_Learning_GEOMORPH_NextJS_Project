# Adaptive Learning System with Emotion Recognition

Sistem pembelajaran adaptif berbasis AI yang menyesuaikan tingkat kesulitan materi berdasarkan performa dan emosi siswa secara real-time.

## Deskripsi

Proyek ini menggabungkan teknologi AI, Augmented Reality (AR), dan deteksi emosi multimodal untuk menciptakan platform pembelajaran yang responsif terhadap kebutuhan emosional dan kognitif siswa. Sistem menggunakan logika fuzzy untuk menyesuaikan konten pembelajaran secara dinamis dan mendeteksi emosi siswa melalui analisis ekspresi wajah dan metrik interaksi.

## Fitur Utama

- **Logika Fuzzy Mamdani**: Menyesuaikan tingkat kesulitan berdasarkan akurasi jawaban, waktu respon, screen time, penggunaan hint, dan emosi siswa
- **Deteksi Emosi Real-time**: Menganalisis ekspresi wajah menggunakan model ONNX (Emotion FER+)
- **Pembelajaran Tiga Dimensi (3D)**: Visualisasi materi dengan Three.js dan komponen AR
- **Sistem Manajemen Pengguna**: Autentikasi, tracking progres, dan analitik pembelajaran
- **Konten Adaptif**: 5 level pembelajaran matematika dari dasar hingga advanced
- **Dashboard Pembelajaran**: Interface untuk siswa, guru, dan administrator

## Setup

### Prerequisites
- Python 3.11+
- Node.js 18+
- npm atau yarn

### Backend Setup

1. Install dependencies:
```bash
cd backend
pip install -r requirements.txt
```

2. Setup database:
```bash
python seed_db.py
```

3. Run server:
```bash
python main.py
```

Server berjalan di `http://localhost:8000`

### Frontend Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Run development server:
```bash
npm run dev
```

Application berjalan di `http://localhost:3000`

## Struktur Proyek

```
.
├── backend/              # API FastAPI
│   ├── main.py          # Entry point server
│   ├── requirements.txt  # Dependencies Python
│   ├── alembic/         # Database migrations
│   ├── app/
│   │   ├── api/         # REST endpoints
│   │   ├── core/        # Konfigurasi dan security
│   │   ├── db/          # Database session
│   │   ├── models/      # SQLAlchemy models
│   │   ├── schemas/     # Pydantic schemas
│   │   ├── services/    # Business logic
│   │   ├── data/        # Data statis (questions.json)
│   │   └── ml_models/   # ONNX models
│   └── seed_db.py       # Database initialization
│
├── frontend/            # Next.js React Application
│   ├── src/
│   │   ├── app/        # Pages dan layouts
│   │   ├── components/ # React components
│   │   └── lib/        # Utilities dan store
│   ├── package.json    # Dependencies Node
│   └── next.config.ts  # Next.js configuration
│
├── models/              # Pre-trained ML models
│   ├── model1/         # Model checkpoints
│   └── model2/
│
└── Design Mockup Template/ # UI/UX mockups
```

## Teknologi

### Backend
- FastAPI (Web framework)
- SQLAlchemy + SQLModel (ORM)
- SQLite (Database)
- Alembic (Migration tool)
- ONNX Runtime (Model inference)
- OpenCV (Image processing)
- scikit-learn (ML utilities)
- Google Generative AI (Content generation)

### Frontend
- Next.js 16 (React framework)
- TypeScript
- React Three Fiber (3D graphics)
- Zustand (State management)
- Tailwind CSS (Styling)
- Recharts (Data visualization)
- React Webcam (Emotion capture)

## API Endpoints

### Authentication
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/register` - Register user
- `POST /api/v1/auth/logout` - Logout

### Learning
- `GET /api/v1/learning/questions` - Ambil soal
- `POST /api/v1/learning/submit` - Submit jawaban
- `GET /api/v1/learning/progress` - Lihat progres

### Content
- `GET /api/v1/content/materials` - Materi pembelajaran
- `GET /api/v1/content/levels` - Level kesulitan

### Analytics
- `GET /api/v1/analytics/performance` - Analitik performa
- `GET /api/v1/analytics/emotions` - Data emosi siswa
- `GET /api/v1/analytics/recommendations` - Rekomendasi sistem

### Session
- `POST /api/v1/session/start` - Mulai sesi
- `POST /api/v1/session/end` - Akhiri sesi

## Model ML

Project menggunakan ONNX models untuk emotion recognition:
- `emotion-ferplus-8.onnx` - Model emotion detection (8 emotions)
- `emotion-ferplus-12.onnx` - Model emotion detection (12 emotions)

Models tersedia di `backend/app/ml_models/`

## Database Schema

Database SQLite dengan migrations Alembic yang mencakup:
- Users (siswa, guru, admin)
- Sessions (sesi pembelajaran)
- Interactions (data interaksi siswa)
- Questions (soal dan jawaban)
- Content (materi pembelajaran)

## Development

### Running Tests
```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
npm run test
```

### Building

Backend (development):
```bash
cd backend
python main.py
```

Frontend (production):
```bash
cd frontend
npm run build
npm run start
```

## Environment Variables

Backend (`.env`):
```
DATABASE_URL=sqlite:///./test.db
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

Frontend (`.env.local`):
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Kontribusi

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## Tim

- Felix Angga Resky (152023148)
- Raelqiansyah Putranta Dibrata (152023167)
- Difie Anggely (152023186)

Institut Teknologi Nasional Bandung

## Lisensi

MIT License

## Kontak & Support

Untuk pertanyaan dan support, silakan buat issue di repository atau hubungi tim pengembang.
