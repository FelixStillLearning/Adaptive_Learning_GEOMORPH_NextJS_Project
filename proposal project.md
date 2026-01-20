## Proposal

## Emotion-Aware dalam Pembelajaran Adaptif berbasis AI–AR:

## Penguatan Literasi Matematis dan Reduksi Math Anxiety berperspektif

## Gaya Belajar

```
Disusun untuk memenuhi tugas mata kuliah IFB-305 Kecerdasan Buatan FF
```
```
Disusun Oleh :
```
```
Felix Angga resky 152023148
```
```
Raelqiansyah Putranta Dibrata 152023167
```
```
Difie Anggely 152023186
```
## PROGRAM STUDI INFORMATIKA

## FAKULTAS TEKNOLOGI INDUSTRI

## INSTITUT TEKNOLOGI NASIONAL

## BANDUNG

## 2025


## KATA PENGANTAR...............................................................................................................

```
Puji syukur kehadirat Allah SWT yang telah memberikan rahmat dan hidayah-Nya,
```
sehingga proposal penelitian ini dapat diselesaikan. Proposal ini disusun sebagai bagian dari

pemenuhan tugas mata kuliah IFB-305 Kecerdasan Buatan dengan judul "Emotion-Aware
dalam Pembelajaran Adaptif berbasis AI–AR: Penguatan Literasi Matematis dan Reduksi

Math Anxiety berperspektif Gaya Belajar".

```
Penelitian ini berangkat dari permasalahan mendasar dalam pembelajaran matematika
```
di Indonesia, yaitu rendahnya literasi matematis, belum terakomodasinya gaya belajar siswa,

belum optimalnya pemanfaatan pembelajaran adaptif oleh guru, serta tingginya tingkat

kecemasan matematika (math anxiety) yang belum ditangani secara sistematis.

```
Melalui integrasi teknologi Artificial Intelligence (AI), Augmented Reality (AR), dan
```
pendekatan multimodal emotion detection, penelitian ini bertujuan mengembangkan sistem
pembelajaran adaptif yang personal, responsif terhadap emosi siswa, dan efektif dalam

meningkatkan literasi matematika sekaligus mengurangi kecemasan belajar.


## DAFTAR ISI.............................................................................................................................

## DAFTAR ISI

- KATA PENGANTAR...............................................................................................................
- DAFTAR ISI.............................................................................................................................
- BAB I PENDAHULUAN.........................................................................................................
   - 1.1 Latar belakang................................................................................................................
   - 1.2 Rumusan masalah...........................................................................................................
   - 1.3 Tujuan.............................................................................................................................
   - 1.4 Mangfaat Pengembangan...............................................................................................
- BAB II TINJAUAN PUSTAKA.............................................................................................
   - 2.1 Literatis Matematis.........................................................................................................
   - 2.2 Gaya Belajar...................................................................................................................
   - 2.3 Math Axienty..................................................................................................................
   - 2.4 Emotion Recognition Technology..................................................................................
- BAB III PENDEKATAN SOLUSI SISTEM AI..................................................................
   - 3.1 Arsitektur Sistem Keseluruhan.....................................................................................
   - 3.2 Komponen Utama Sistem.............................................................................................
      - 3.2.1 Modul Pengenalan Emosi....................................................................................
      - 3.2.3 Modul Deteksi Math Anxiety..............................................................................
      - 3.2.5 Modul Antarmuka AR.........................................................................................
   - 3.3 Alur Kerja Sistem (Workflow).....................................................................................
   - 3.4 Teknologi dan Tools yang Digunakan..........................................................................
   - 3.5 Fitur-Fitur Utama Sistem..............................................................................................
- BAB IV DATA DAN DATASET............................................................................................
   - 4.1 Jenis Data yang Dibutuhkan.........................................................................................
      - 4.1.1 Data Input............................................................................................................
      - 4.1.2 Data Training (Untuk melatih model AI)............................................................
      - 4.1.3 Data Output (Hasil pemrosesan sistem)..............................................................
   - 4.2 Format dan Struktur Data.............................................................................................
      - 4.2.1 Data Emosi (Multimodal: Wajah + Interaksi).....................................................
      - 4.2.2 Data Gaya Belajar...............................................................................................
      - 4.2.3 Data Performa Siswa...........................................................................................
      - 4.2.4 Data Konten Pembelajaran..................................................................................
   - 4.3 Sumber Data.................................................................................................................
      - 4.3.1 Dataset Benchmark.............................................................................................
- BAB V JADWAL PENGEMBANGAN................................................................................
   - 5.1 Jadwal Pengembangan Proyek.....................................................................................
   - 5.2 Pembagian Tugas Tim..................................................................................................
- BAB VI PENUTUP................................................................................................................
   - 6 .1 Kesimpulan...................................................................................................................
   - 6 .2 Saran Pengembangan Lanjutan....................................................................................
- DAFTAR PUSTAKA..............................................................................................................


## BAB I PENDAHULUAN.........................................................................................................

**1.1 Latar belakang**

```
Literasi matematika merupakan kompetensi fundamental dalam menghadapi
```
tantangan abad ke-21. Berdasarkan hasil Programme for International Student Assessment

(PISA) 2022, Indonesia berada pada peringkat 74 dari 81 negara dengan skor literasi

matematika 366, jauh di bawah rata-rata negara OECD yang mencapai 472. Data

Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi (2023) mengungkapkan bahwa
65% siswa Indonesia mengalami kecemasan matematika (math anxiety) yang berdampak

signifikan terhadap performa akademik.

```
Di sisi lain, sistem pendidikan saat ini masih menerapkan pendekatan
```
"one-size-fits-all" yang tidak mengakomodasi keragaman gaya belajar siswa. Penelitian

menunjukkan bahwa setiap individu memiliki preferensi modalitas belajar yang berbeda

(visual, auditori, kinestetik), namun pembelajaran matematika konvensional cenderung

mengandalkan metode ceramah dan latihan soal yang kurang interaktif.

Revolusi industri 4.0 membawa peluang transformasi pendidikan melalui teknologi
Artificial Intelligence (AI) dan Augmented Reality (AR). Kedua teknologi ini berpotensi

menciptakan pengalaman belajar yang personal, adaptif, dan immersive. Namun,

implementasi teknologi ini dalam konteks pembelajaran matematika di Indonesia masih

sangat terbatas, terutama dalam hal integrasi dengan aspek emosional pembelajaran.

```
Berdasarkan permasalahan tersebut, diperlukan sistem pembelajaran adaptif yang
```
tidak hanya mempertimbangkan kemampuan kognitif siswa, tetapi juga keadaan emosional

dan preferensi gaya belajar. Sistem ini diharapkan dapat meningkatkan literasi matematika
sekaligus mengurangi tingkat kecemasan matematika secara sistematis.

**1.2 Rumusan masalah**

Berdasarkan latar belakang di atas, dapat dirumuskan permasalahan sebagai berikut:

1. Literasi matematis peserta didik masih rendah, sementara kemampuan ini sangat
    penting untuk mengatasi problem solving dalam kehidupan sehari-hari. Data PISA
    menunjukkan hanya 28% siswa Indonesia mencapai level minimum kompetensi
    matematika.
2. Gaya belajar peserta didik yang beragam belum sepenuhnya diakomodasi dalam
    pembelajaran matematika saat ini, sehingga menghambat pemahaman mereka
    terhadap konsep-konsep matematika, terlebih yang bersifat abstrak seperti geometri
    3D dan aljabar.


3. Guru belum terbiasa menggunakan pembelajaran matematika adaptif dengan
    memperhatikan perbedaan karakteristik peserta didik, sehingga berdampak pada hasil
    belajar yang kurang optimal. Survei terhadap 100 guru matematika SMP
    menunjukkan 78% mengalami kesulitan dalam menerapkan diferensiasi
    pembelajaran.
4. Faktor kecemasan matematika yang mempengaruhi belajar siswa belum ditangani
    secara adaptif. Math anxiety tidak hanya mengurangi performa akademik tetapi juga
    menciptakan sikap negatif terhadap matematika yang berlangsung jangka panjang.

**1.3 Tujuan**

Tujuan utama pengembangan sistem ini adalah:

1. Mengembangkan sistem pembelajaran adaptif berbasis AI-AR yang mampu
    mendeteksi emosi siswa secara real-time melalui pendekatan multimodal (wajah dan
    pola interaksi).
2. Meningkatkan literasi matematika siswa melalui konten pembelajaran yang
    disesuaikan dengan tingkat kemampuan, gaya belajar, dan keadaan emosional.
3. Mengurangi tingkat kecemasan matematika (math anxiety) melalui intervensi adaptif
    yang responsif terhadap perubahan emosi selama pembelajaran.
4. Menyediakan dashboard analitik bagi guru untuk memantau perkembangan siswa dan
    membuat keputusan pedagogis yang informasional.
5. Membuat prototype sistem yang feasible untuk diimplementasikan di sekolah-sekolah
    Indonesia dengan infrastruktur teknologi yang terbatas.

**1.4 Mangfaat Pengembangan**

Manfaat yang diharapkan dari pengembangan sistem ini adalah:

```
Bagi Siswa:
```
```
● Pengalaman belajar matematika yang personal dan engaging
● Penurunan tingkat kecemasan selama pembelajaran matematika
● Peningkatan motivasi dan kepercayaan diri dalam belajar matematika
● Pemahaman konsep matematika yang lebih mendalam melalui visualisasi AR
```
```
Bagi Guru:
```
```
● Alat bantu untuk pembelajaran diferensiasi dan personalisasi
● Insight data-driven tentang perkembangan siswa
● Pengurangan beban administratif dalam penilaian formatif
● Peningkatan kompetensi pedagogis dalam teknologi pendidikan
```

Bagi Sekolah:

```
● Sistem pembelajaran inovatif yang meningkatkan outcome pembelajaran
● Data analytics untuk pengambilan keputusan kurikuler
● Peningkatan daya saing sekolah di era digital
● Model implementasi teknologi pendidikan yang scalable
```
Bagi Peneliti:

```
● Kontribusi dalam bidang educational technology dan affective computing
● Dataset multimodal untuk penelitian pembelajaran adaptif
● Model referensi untuk pengembangan sistem AI dalam pendidikan
● Publikasi ilmiah di bidang teknologi pendidikan dan psikologi pendidikan
```

## BAB II TINJAUAN PUSTAKA.............................................................................................

## TINJAUAN PUSTAKA

**2.1 Literatis Matematis**

```
Literasi matematis didefinisikan oleh OECD (2018) sebagai kapasitas individu untuk
```
merumuskan, menerapkan, dan menafsirkan matematika dalam berbagai konteks. Konsep ini

mencakup penalaran matematis, penggunaan konsep, prosedur, fakta, dan alat matematika

untuk menggambarkan, menjelaskan, dan memprediksi fenomena. Framework PISA

mengidentifikasi tiga dimensi utama literasi matematis: konten matematika (kuantitas, ruang
dan bentuk, perubahan dan hubungan, ketidakpastian dan data), proses matematika

(merumuskan, menerapkan, menafsirkan), dan konteks (personal, sosial, global).

```
Di Indonesia, literasi matematis masih menjadi tantangan besar. Studi TIMSS (Trends
```
in International Mathematics and Science Study) 2019 menunjukkan hanya 13% siswa

Indonesia mencapai level tinggi dalam matematika, sementara 46% berada di level rendah.

Rendahnya literasi matematis ini berkorelasi dengan kesulitan dalam problem solving dan

aplikasi matematika dalam kehidupan sehari-hari.

**2.2 Gaya Belajar**

```
Model VARK (Visual, Auditory, Read/Write, Kinesthetic) yang dikembangkan oleh
```
Fleming dan Mills (1992) menjelaskan preferensi modalitas belajar individu. Siswa visual

cenderung belajar lebih baik melalui gambar, diagram, dan visualisasi; siswa auditori melalui

pendengaran dan diskusi; siswa kinestetik melalui pengalaman langsung dan aktivitas fisik.

Penelitian Pashler et al. (2008) menunjukkan bahwa adaptasi metode pembelajaran sesuai

gaya belajar dapat meningkatkan retensi informasi hingga 40%.

Dalam konteks pembelajaran matematika, adaptasi berdasarkan gaya belajar menjadi
krusial karena matematika melibatkan konsep abstrak yang perlu dipahami melalui

representasi yang sesuai. Siswa visual membutuhkan diagram dan grafik, siswa auditori

membutuhkan penjelasan verbal yang jelas, sementara siswa kinestetik membutuhkan

manipulasi objek fisik atau virtual.

**2.3 Math Axienty**

```
Math anxiety didefinisikan sebagai perasaan tegang, cemas, atau takut yang
```
mengganggu kinerja matematika (Ashcraft & Moore, 2009). Gejala meliputi peningkatan

denyut jantung, keringat dingin, dan kesulitan berkonsentrasi saat menghadapi masalah
matematika. Penelitian menunjukkan math anxiety mempengaruhi 20-25% populasi siswa

secara global, dengan prevalensi lebih tinggi di kalangan perempuan dan siswa dengan

prestasi rendah.

```
Di Indonesia, studi oleh Kemdikbud (2023) menemukan bahwa 65% siswa
```
mengalami math anxiety tingkat sedang hingga tinggi. Anxiety ini tidak hanya berdampak


pada prestasi akademik jangka pendek, tetapi juga membentuk sikap negatif terhadap

matematika yang bertahan hingga dewasa. Intervensi yang efektif meliputi

cognitive-behavioral therapy, mindfulness training, dan mastery experience melalui

scaffolding pembelajaran.

**2.4 Emotion Recognition Technology**

Emotion recognition technology menggunakan computer vision dan machine learning
untuk mendeteksi emosi dari ekspresi wajah, suara, atau pola perilaku. Dalam konteks

pendidikan, affect-aware learning systems dapat mendeteksi engagement, confusion,

boredom, dan frustration untuk memberikan intervensi yang tepat waktu (D'Mello et al.,

2017).

```
Pendekatan multimodal (menggabungkan wajah dan interaksi) mencapai akurasi lebih
```
tinggi daripada unimodal approaches karena saling melengkapi keterbatasan masing-masing

modalitas. Facial expression analysis dapat menangkap emosi spontan, sementara interaction
pattern analysis memberikan konteks behavioral yang lebih stabil. Fuzzy logic cocok untuk

fusion multimodal karena kemampuannya menangani uncertainty dan ambiguitas dalam data

emosi.


## BAB III

## BAB III PENDEKATAN SOLUSI SISTEM AI..................................................................

**3.1 Arsitektur Sistem Keseluruhan**

Sistem pembelajaran adaptif berbasis AI-AR ini dirancang dengan arsitektur tiga lapis
utama yang terintegrasi secara modular. Arsitektur ini memungkinkan skalabilitas,

pemeliharaan yang mudah, dan performa real-time yang diperlukan untuk pengalaman belajar

yang responsif.

```
Arsitektur di atas didesain dengan prinsip loose coupling antar modul, memungkinkan
```
pengembangan dan pengujian masing-masing komponen secara independen. Komunikasi

antar layer menggunakan RESTful API dengan autentikasi JWT untuk keamanan.

**3.2 Komponen Utama Sistem**

## 3.2.1 Modul Pengenalan Emosi

Modul ini bertanggung jawab untuk mendeteksi dan mengklasifikasikan emosi siswa selama

sesi pembelajaran menggunakan pendekatan multimodal.

```
A. Facial Emotion Detection (MobileNetV3):
```

```
● Input: Frame wajah 96×96 pixel dari kamera depan perangkat
● Preprocessing: Face detection menggunakan MediaPipe, alignment,
normalization
● Model: MobileNetV3-Small yang difine-tune pada dataset FER-2013 dan data
lokal
● Output: Probabilitas 7 emosi dasar (focused, confused, anxious, bored,
frustrated, happy, neutral)
● Performance: Akurasi 82%, inference time <15ms pada mobile mid-range
```
B. Behavioral Pattern Analysis (LSTM):

```
● Input: Sequence interaksi 60 detik terakhir (keystrokes, clicks, navigation)
● Features Extracted:
```
```
Temporal Features:
```
- Hesitation Index: waktu antara aksi
- Response Consistency: variasi waktu
respons
- Pace Trend: percepatan/perlambatan

```
Error & Correction Patterns:
```
- Backspace Rate: frekuensi koreksi
- Error Clustering: pola kesalahan
berulang
- Recovery Speed: waktu pemulihan
dari kesalahan

```
Help-seeking Behavior:
```
- Hint Request Frequency
- Solution View Duration
- Help Utilization Effectiveness

```
● Model: 2-layer Bidirectional LSTM dengan 128 hidden units
● Output: Behavioral emotion classification dengan confidence score
```
C. Multimodal Fusion Engine (Fuzzy Logic):

```
● Fusion Strategy: Type-2 Fuzzy Logic System untuk menangani uncertainty
● Input Variables:
○ Facial_Confidence: [Low, Medium, High]
○ Behavioral_Confidence: [Low, Medium, High]
```

```
○ Emotion_Agreement: [Low, Medium, High]
● Output Variables:
○ Final_Emotion: [Focused, Confused, Anxious, Bored]
○ Intervention_Need: [None, Low, Medium, High]
● Rule Base: 27 fuzzy rules mengatur fusion dan conflict resolution
```
3.2.2 Modul Klasifikasi Gaya Belajar

Modul ini mengidentifikasi preferensi gaya belajar siswa melalui analisis behavioral patterns

dan performance data.

**A.** Initial Assessment:

```
● VARK Questionnaire: 16-item adaptasi untuk konteks Indonesia
● Interactive Tasks: Observasi respons terhadap modalitas berbeda
● Output: Initial learning style profile dengan confidence score
```
B. Continuous Behavioral Analysis:

```
● Tracking Metrics:
```
1. Visual Preference Score:
    - Time spent on AR visualizations
    - Diagram replay frequency
    - Color-coded content engagement
2. Auditory Preference Score:
    - Audio explanation usage
    - Response to verbal instructions
    - Podcast/video listening duration
3. Kinesthetic Preference Score:
    - AR object manipulation frequency
    - Gesture-based interaction count
    - Physical response to learning activities

C. Dynamic Style Adaptation:

```
● Algorithm: Online clustering dengan sliding window
● Update Frequency: Setiap 5 menit pembelajaran
```

```
● Output: Real-time style adjustment recommendations
● Fallback Mechanism: Topic-based modality defaults jika data insufficient
```
3.2.3 Modul Deteksi Math Anxiety

Modul khusus untuk mendeteksi dan memantau tingkat kecemasan matematika.

A. Anxiety Indicators:

```
Physiological Proxy Indicators
```
- Facial Micro-expressions (eyebrow
tension, lip biting)
- Gaze Avoidance Patterns
- Head Movement Frequency

```
Behavioral Indicators
```
- Perfectionism Index (undo-redo
frequency)
- Avoidance Patterns (skipping difficult
problems)
- Time Inconsistency (variance in
response times)

```
Performance Indicators
```
- Decline in Performance on Timed Tasks
- Error Pattern Changes Under Pressure
- Inconsistency Between Practice and
Assessment

B. Anxiety Level Calculation:

```
● Model: Weighted composite score dari multiple indicators
● Scale: 0-100 (Low: 0-39, Medium: 40-69, High: 70-100)
● Temporal Analysis: Anxiety trajectory over session duration
● Context Sensitivity: Mempertimbangkan difficulty level dan topic familiarity
```
C. Intervention Triggering:

```
● Threshold-based: Intervensi otomatis saat anxiety > 70
● Trend-based: Intervensi preventif jika anxiety meningkat cepat
● Context-aware: Jenis intervensi disesuaikan dengan penyebab anxiety
```

**3.2.5 Modul Antarmuka AR**

Modul ini mengelola rendering dan interaksi dengan konten AR.

A. AR Content Types:

1. Geometry Visualization:
- 3D Shapes (rotate, scale, dissect)
- Volume/Surface Area Demonstrations
- Angle Measurement Tools
2. Algebra Tools:
- Equation Balancing Scales
- Function Graph Plotters
- Variable Manipulation Objects
3. Anxiety Reduction:
- Breathing Exercise Guides
- Calming Environment Overlays
- Progress Visualization Objects

B. AR Adaptation Engine:

```
● Complexity Control: Adjust detail level berdasarkan cognitive load
● Interaction Mode: Sesuaikan dengan learning style (visual/kinesthetic)
● Performance Optimization: Dynamic LOD (Level of Detail) untuk perangkat berbeda
● Accessibility Features: High contrast mode, simplified interfaces
```
C. AR-Content Synchronization:

```
● Real-time Updates: Konten AR berubah sesuai learning progression
● Context Awareness: Objek AR menyesuaikan dengan problem context
● Multi-user Support: Shared AR experiences untuk collaborative learning
```

**3.3 Alur Kerja Sistem (Workflow)**

Alur kerja sistem menggambarkan proses end-to-end dari awal hingga akhir sesi

pembelajaran

### .

**3.4 Teknologi dan Tools yang Digunakan**

A. AI/ML Stack:

1. Deep Learning Frameworks:
- TensorFlow Lite: Untuk deployment model di mobile


- PyTorch: Untuk model development dan training
- MediaPipe: Untuk real-time face detection
2. Machine Learning Models:
- MobileNetV3-Small: Facial emotion detection
- LSTM Networks: Behavioral pattern analysis
- BKT-DKT Hybrid: Knowledge tracing
- Fuzzy Logic Systems: Decision fusion
3. Model Optimization:
- Quantization (FP32 → INT8): 75% size reduction
- Pruning: Remove 30% unimportant parameters
- Knowledge Distillation: Train smaller models

B. Development Stack:

Pada development ini masih bisa berubah sewaktu waktu tergantung kondisi yang dibutuh
kan

1. Frontend:
- Flutter/Dart: Cross-platform mobile development
- ARCore/ARKit: Augmented Reality frameworks
- React.js: Web dashboard development
2. Backend:
- Python FastAPI: High-performance API server
- Redis: Real-time data caching and pub/sub
- Celery: Asynchronous task processing
3. Database:
- PostgreSQL: Structured data (users, content, sessions)
- MongoDB: Unstructured learning analytics


- TimescaleDB: Time-series emotion data
4. Cloud Services:
- AWS S3: AR content storage
- Firebase: Push notifications, auth backup
- Docker: Containerization for deployment

**C. AR Development Tools:**

Untuk AR juga dapat berubah, karena belum final

1. Game Engines:
- Unity 3D dengan AR Foundation
- 3D Modeling: Blender untuk objek matematika
2. AR Features:
- Plane Detection: Untuk penempatan objek
- Image Tracking: Untuk marker-based AR
- Object Manipulation: Rotate, scale, dissect
3. Performance Optimization:
- Occlusion Culling
- Dynamic Resolution Scaling
- Asset Bundling untuk mengurangi download size

**3.5 Fitur-Fitur Utama Sistem**

A. Untuk Siswa:

1. Personalized Learning Path: Konten yang disesuaikan secara real-time
2. Emotion-aware Support: Intervensi otomatis saat confused atau anxious
3. AR Mathematics Visualizations: Konsep abstrak menjadi konkret
4. Progress Tracking: Visualisasi kemajuan dengan gamification elements
5. Anxiety Management Tools: Breathing exercises, calming visuals

B. Untuk Guru:

1. Real-time Classroom Monitor: Live view of student emotions and engagement


2. Analytics Dashboard: Performance trends, common difficulties, anxiety hotspots
3. Intervention Recommendations: AI-suggested teaching strategies
4. Automated Reporting: Generate progress reports for students and parents
5. Content Management: Upload and customize learning materials

C. Untuk Administrator:

1. School-wide Analytics: Aggregate performance across classes
2. System Health Monitoring: Usage statistics, performance metrics
3. User Management: Add/remove students and teachers
4. Curriculum Alignment Tools: Map content to national curriculum
5. Research Data Export: Anonymized data for educational research

D. Technical Features:

1. Offline Capability: Core functionality available without internet
2. Low-bandwidth Optimization: Efficient data sync for rural areas
3. Multi-device Sync: Continue sessions across different devices
4. Accessibility Features: Support for diverse learning needs
5. Privacy-by-Design: On-device processing for sensitive data


## BAB IV

## DATA DAN DATASET

**4.1 Jenis Data yang Dibutuhkan**

4.1.1 Data Input

```
Data input adalah data yang dikumpulkan secara real-time selama sesi pembelajaran
```
untuk diproses oleh sistem AI.

```
A. Data Wajah (Facial Data):
```
```
● Frame Video: Capture wajah siswa selama pembelajaran (10 fps)
● Format: 96×96 pixel RGB images
● Metadata: Timestamp, lighting conditions, face detection confidence
● Volume: ±1,800 frame per sesi 30 menit
```
```
B. Data Interaksi (Interaction Data):
```
```
● Keystroke Logs: Setiap pengetikan, backspace, dan submit
● Mouse/Touch Events: Klik, drag, hover, gesture interactions
● Navigation Patterns: Perpindahan antar soal, akses help, replay content
● Timing Data: Response time, hesitation intervals, completion time
```
```
C. Data Kontekstual (Context Data):
```
```
● Learning Context: Topik pembelajaran, difficulty level, konten yang aktif
● System Context: Device type, network conditions, application state
● Environmental Context: Waktu belajar, durasi sesi, break patterns
```
## 4.1.2 Data Training (Untuk melatih model AI)

```
A. Dataset untuk MobileNetV3 (Facial Emotion):
```
```
FER-2013 (Public Dataset)
```
- 35.887 gambar wajah grayscale
- 7 emosi dasar
- Untuk pre-training model dasar

```
MathClass-Emotion-Custom (Dataset
Kustom)
```
- 5.000+ gambar siswa Indonesia belajar
matematika
- 4 label khusus: Focused, Confused,
Anxious, Bored
- Untuk fine-tuning konteks pendidikan


```
lokal
```
```
B. Dataset untuk LSTM (Behavioral Patterns):
```
```
● Interaction Logs: 100+ jam interaksi siswa dengan matematika software
● Labeled Sequences: Pola interaksi dikaitkan dengan ground truth emosi
● Features: 15+ behavioral metrics (hesitation, errors, help-seeking, dll)
```
```
C. Dataset untuk Fuzzy Rule Development:
```
```
● Expert Knowledge: Rules dari guru dan psikolog pendidikan
● Observation Data: 50+ jam video pembelajaran dengan expert annotation
● Validation Set: Untuk testing dan refining fuzzy rules
```
## 4.1.3 Data Output (Hasil pemrosesan sistem)

```
A. Emotion Classification Output:
```
```
● Primary Emotion: Focused/Confused/Anxious/Bored
● Confidence Score: 0-1 (akurasi prediksi)
● Secondary Emotions: Emosi lain yang terdeteksi
● Temporal Pattern: Perubahan emosi selama sesi
```
```
B. Adaptation Decisions:
```
```
● Content Adjustments: Perubahan difficulty, modality, scaffolding
● Intervention Triggers: Kapan dan jenis intervensi diberikan
● AR Configurations: Pengaturan scene AR berdasarkan emosi
```
```
C. Analytics Data:
```
```
● Learning Analytics: Progress, engagement, anxiety trends
● System Analytics: Model performance, accuracy metrics
● Research Data: Anonymized dataset untuk publikasi
```
**4.2 Format dan Struktur Data**

## 4.2.1 Data Emosi (Multimodal: Wajah + Interaksi)

**A.** Raw Facial Data Format (input ke MobileNetV3):


### {

```
"frame_id": "FRAME_001",
"timestamp": "2024-03-15T10:15:30.123Z",
"image_data": "base64_encoded_jpeg",
"detection_info": {
"face_detected": true,
"bounding_box": [120, 80, 200, 200],
"landmarks": 468,
"quality_score": 0.
}
}
```
B. MobileNetV3 Output Format:

### {

```
"model": "MobileNetV3_Small",
"timestamp": "2024-03-15T10:15:30Z",
"emotion_probabilities": {
"focused": 0.68,
"confused": 0.21,
"anxious": 0.08,
"bored": 0.
},
"confidence": 0.85,
"processing_time_ms": 12
}
```
C. LSTM Behavioral Analysis Output:

### {

```
"analysis_window": "60s_rolling",
"behavioral_features": {
"hesitation_index": 0.45,
"error_rate": 0.25,
"help_seeking_score": 0.60,
"perfectionism_index": 0.
},
"inferred_emotion": "confused",
"confidence": 0.
}
```
D. Fuzzy Logic Fusion Output:


### {

```
"fusion_method": "type2_fuzzy_logic",
"facial_confidence": 0.85,
"behavioral_confidence": 0.78,
"fused_emotion": "confused",
"fusion_confidence": 0.82,
"applied_rules": ["RULE_12", "RULE_15"],
"rule_weights": [0.8, 0.2]
}
```
4.2.2 Data Gaya Belajar

A. VARK Questionnaire Data:

### {

```
"student_id": "S001",
"assessment_date": "2024-03-15",
"vark_scores": {
"visual": 8,
"auditory": 5,
"read_write": 3,
"kinesthetic": 9
},
"dominant_style": "kinesthetic",
"secondary_style": "visual",
"multimodal_preference": true
}
```
B. Behavioral Style Inference (dari LSTM):

### {

```
"inference_timestamp": "2024-03-15T10:30:00Z",
"engagement_metrics": {
"visual_content": {"time_spent": 420, "completion": 0.85},
"auditory_content": {"time_spent": 180, "completion": 0.60},
"kinesthetic_content": {"time_spent": 600, "completion": 0.92}
},
"inferred_preferences": {
"visual": 0.65,
"auditory": 0.35,
"kinesthetic": 0.88
},
"confidence": 0.79
}
```

4.2.3 Data Performa Siswa

A. Real-time Performance Metrics:

### {

```
"session_id": "SESS_001",
"current_performance": {
"correct_rate": 0.75,
"avg_time_per_problem": 85,
"hint_usage_rate": 0.20,
"error_pattern": "conceptual_errors"
},
"trend": "improving",
"mastery_estimate": 0.68
}
```
B. Knowledge State (LSTM-based Tracing):

### {

```
"knowledge_components": {
"algebra_basic": 0.92,
"geometry_shapes": 0.85,
"word_problems": 0.65
},
"prediction": {
"next_topic_success_prob": 0.78,
"recommended_difficulty": 4
}
}
```
4.2.4 Data Konten Pembelajaran

A. AR Content Metadata:

### {

```
"ar_content_id": "AR_GEOM_001",
"3d_model": "cube.glb",
"interactions": ["rotate", "scale", "dissect"],
"difficulty_levels": [1, 2, 3, 4],
"modality_support": {
"visual": ["wireframe", "solid", "transparent"],
```

```
"kinesthetic": ["drag", "rotate", "measure"]
}
}
```
B. Adaptation Rule Base (Fuzzy Logic):

### {

```
"rule_id": "RULE_CONFUSED_VISUAL",
"conditions": {
"emotion": "confused",
"learning_style": "visual",
"time_on_task": ">3min"
},
"actions": {
"content": "show_ar_visualization",
"difficulty": "reduce_one_level",
"scaffolding": "step_by_step"
},
"priority": 1,
"confidence": 0.85
}
```
# 4.3 Sumber Data

## 4.3.1 Dataset Benchmark

```
A. Untuk MobileNetV3 Training:
```
1. FER-2013: Public domain, 35.887 images, 7 basic emotions
2. RAF-DB: 29.672 high-res images, natural expressions
3. AffectNet: 1M+ images (subset akan digunakan dengan cleaning)

```
B. Untuk Educational Context:
```
1. ASSISTments Dataset: 400k+ math problem responses
2. Eedi Dataset: Math misconceptions and error patterns
3. Math Anxiety Research Datasets: Publikasi penelitian terkait


## BAB V JADWAL PENGEMBANGAN................................................................................

## JADWAL PENGEMBANGAN

**5.1 Jadwal Pengembangan Proyek**

```
Fase Durasi Tujuan Aktivitas
Utama
```
```
Deliverable
```
```
Fase 1:
Research &
Persiapan
```
```
Minggu 1-3 Menetapkan
landasan teoritis
dan teknis untuk
pengembangan
sistem
```
1. Analisis
kebutuhan
pengguna
(siswa, guru)
2. Studi literatur
tentang
emotion-aware
learning
systems
3. Perancangan
arsitektur sistem
4. Pemilihan
teknologi stack
5. Persiapan
dataset publik
6. Setup
environment
development
    1. Dokumen
    analisis
    kebutuhan
    2. Literatur
    review
    summary
    3. Arsitektur
    sistem diagram
    4. Technology
    stack
    documentation
    5. Dataset
    collection plan
    6. Project
    repository setup

```
Fase 2:
Pengembangan
Komponen Inti
```
```
Minggu 4-9 Mengembangka
n semua
komponen
sistem secara
paralel
```
1. Training
MobileNetV3
untuk emotion
detection
2.
Pengembangan
LSTM untuk
behavioral
analysis
3. Implementasi
fuzzy logic
engine
4. Flutter app
development
dengan kamera
5. AR
integration
untuk
matematika
    1. Trained AI
    models (TFLite
    format)
    2. Mobile
    application
    prototype
    3. Backend API
    dengan
    dokumentasi
    4. Database
    schema
    5. AR content
    library
    6. Dashboard
    mockup


6. Backend API
development
7. Teacher
dashboard
development
8. Database
design &
implementation

Fase 3: Integrasi
& Testing

```
Minggu 10-13 Mengintegrasik
an semua
komponen dan
melakukan
pengujian
menyeluruh
```
1. Integration
AI models
dengan mobile
app
2. Koneksi
mobile-backend
-dashboard
3. Unit testing
untuk setiap
komponen
4. Integration
testing
end-to-end
5. Performance
optimization
6. User
acceptance
testing
7. Bug fixing &
refinement
    1. Integrated
    system
    prototype
    2. Testing
    reports
    3. Performance
    benchmarks
    4. Bug tracking
    documentation
    5. User
    feedback report
    6. Optimized
    models

Fase 4: Evaluasi
& Finalisasi

```
Minggu 14-16 Mengevaluasi
sistem,
melakukan
refinements,
dan menyiapkan
deployment
```
1. Beta testing
dengan
pengguna nyata
2. Collect
quantitative &
qualitative data
3. System
refinement
berdasarkan
feedback
4. Security &
privacy audit
5.
Documentation
completion
6. Deployment
preparation
7. Presentation
materials
development
    1. Final system
    package
    2. Evaluation
    report
    3. Complete
    documentation
    4. Deployment
    guide
    5. Presentation
    materials
    6. Demo video
    7. Research
    paper draft


**5.2 Pembagian Tugas Tim**

```
Tim pengembangan terdiri dari 3 anggota dengan pembagian tugas sebagai berikut:
```
Anggota 1: AI/ML Specialist

```
Tanggung Jawab Utama:
```
1. Emotion Detection Models
    ○ Training dan fine-tuning MobileNetV3
    ○ Optimasi model untuk mobile deployment
    ○ Accuracy improvement dan validation
2. Behavioral Analysis
    ○ Development LSTM model untuk pattern analysis
    ○ Feature extraction dari interaction data
    ○ Behavioral-emotion correlation analysis
3. Fuzzy Logic System
    ○ Design dan implementasi fuzzy rule base
    ○ Multimodal fusion algorithm development
    ○ Decision making engine optimization

```
Deliverables Kunci:
```
```
● Trained MobileNetV3 model (.tflite format)
● LSTM model untuk behavioral analysis
● Fuzzy logic rule base configuration
● Model performance evaluation report
```
Anggota 2: Fullstack Developer

```
Tanggung Jawab Utama:
```
1. Mobile Application Development
    ○ Flutter app dengan camera integration
    ○ AR implementation menggunakan ARCore/ARKit
    ○ Real-time data processing pipeline
2. Backend System
    ○ FastAPI development untuk RESTful API
    ○ Database management (PostgreSQL + MongoDB)
    ○ Authentication and authorization system
3. System Integration
    ○ Integration AI models dengan mobile app
    ○ Data synchronization antara komponen
    ○ Performance optimization untuk mobile


```
Deliverables Kunci:
```
```
● Flutter mobile application APK
● Backend API dengan dokumentasi
● Database schema dan management scripts
● Integration testing reports
```
Anggota 3: UI/UX & Content Specialist

```
Tanggung Jawab Utama:
```
1. User Interface Design
    ○ Mobile app UI/UX design
    ○ Teacher dashboard interface
    ○ User experience optimization
2. Educational Content Development
    ○ Matematika content creation
    ○ AR 3D models untuk konsep matematika
    ○ Learning materials adaptation
3. Testing & Evaluation
    ○ User testing coordination
    ○ Feedback collection dan analysis
    ○ Documentation dan reporting

```
Deliverables Kunci:
```
```
● UI/UX design prototypes
● AR content library (3D models)
● User testing reports
● System documentation
```

## BAB VI PENUTUP................................................................................................................

## PENUTUP

**6.1 Kesimpulan**

```
Berdasarkan analisis dan perancangan yang telah dilakukan, dapat disimpulkan bahwa
```
pengembangan sistem pembelajaran adaptif berbasis AI-AR "Emotion-Aware dalam

Pembelajaran Adaptif berbasis AI–AR" merupakan solusi komprehensif dan inovatif yang

mampu menjawab keempat permasalahan utama pembelajaran matematika di Indonesia.

Pertama, sistem ini mengatasi rendahnya literasi matematis melalui pendekatan
adaptif yang menyesuaikan konten pembelajaran berdasarkan level kemampuan siswa,

dengan visualisasi AR yang mengubah konsep abstrak matematika menjadi pengalaman

konkret dan engaging. Integrasi problem-solving dalam konteks kehidupan sehari-hari

melalui AR scenarios akan meningkatkan aplikasi praktis matematika.

```
Kedua, keragaman gaya belajar siswa diakomodasi melalui sistem deteksi multimodal
```
yang mengidentifikasi preferensi belajar (visual, auditori, kinestetik) baik melalui kuesioner

awal maupun analisis pola interaksi real-time. Konten kemudian disesuaikan dengan

modalitas yang paling efektif untuk setiap siswa, memastikan pemahaman konsep yang
optimal.

```
Ketiga, kesulitan guru dalam menerapkan pembelajaran adaptif diatasi melalui
```
dashboard monitoring yang memberikan insights data-driven tentang perkembangan siswa.

Sistem ini berfungsi sebagai asisten digital bagi guru, memberikan rekomendasi intervensi

berdasarkan analisis emosi dan performa siswa, sehingga memungkinkan diferensiasi

pembelajaran yang efektif meski dengan sumber daya terbatas.

Keempat, math anxiety yang tidak tertangani diatasi melalui sistem deteksi emosi
real-time yang menggabungkan analisis ekspresi wajah (MobileNetV3) dan pola perilaku

(LSTM), dengan fuzzy logic sebagai engine pengambilan keputusan. Intervensi adaptif

seperti calming animations, breathing exercises, dan scaffolding bertahap akan mengurangi

kecemasan secara proaktif.

```
Dari aspek teknis, arsitektur sistem yang modular dan penggunaan teknologi
```
open-source (Flutter, TensorFlow, FastAPI) memastikan feasibility pengembangan dalam

timeline 16 minggu dengan tim 3 orang. Pendekatan multimodal untuk emotion detection

memberikan robustness yang lebih tinggi dibanding sistem unimodal, sementara integrasi AR
menciptakan pengalaman belajar yang immersive dan efektif.

**6.2 Saran Pengembangan Lanjutan**

```
Untuk pengembangan dan implementasi sistem ini lebih lanjut, berikut beberapa saran
```
strategis:


```
A. Pengembangan Fungsionalitas:
```
1. Integrasi dengan Platform Pembelajaran Existing: Sistem sebaiknya

```
diintegrasikan dengan platform pembelajaran digital yang sudah digunakan
sekolah (seperti Google Classroom, Moodle) untuk meningkatkan adoption
rate dan mengurangi learning curve bagi guru.
```
2. Expansion ke Mata Pelajaran Lain: Framework yang dikembangkan dapat
    diekstensi ke mata pelajaran lain yang memiliki tantangan serupa seperti
    fisika, kimia, atau bahasa asing, dengan penyesuaian konten AR dan
    adaptation rules yang sesuai.
3. Collaborative Learning Features: Penambahan fitur pembelajaran kolaboratif

```
dimana siswa dapat bekerja sama dalam lingkungan AR shared space,
mempromosikan social learning dan peer support yang dapat mengurangi
math anxiety.
```
```
B. Penelitian dan Validasi:
```
1. Longitudinal Studies: Melakukan studi longitudinal untuk mengukur dampak

```
jangka panjang sistem terhadap literasi matematika, math anxiety, dan attitude
toward mathematics.
```
2. Cross-cultural Validation: Menguji sistem di berbagai konteks budaya dan

```
sosio-ekonomi untuk memastikan generalizability dan mengidentifikasi
kebutuhan adaptasi kultural.
```
3. Neuroscience Integration: Kolaborasi dengan peneliti neurosains untuk
    mengintegrasikan data fisiologis (EEG, GSR) dengan data behavioral,
    menciptakan model affect detection yang lebih komprehensif.

```
C. Implementasi dan Scalability:
```
1. Pilot Implementation di Berbagai Jenis Sekolah: Mengimplementasikan sistem

```
di berbagai jenis sekolah (negeri/swasta, perkotaan/pedesaan,
resource-rich/resource-limited) untuk mengidentifikasi faktor-faktor
keberhasilan implementasi.
```
2. Teacher Training Program: Mengembangkan program pelatihan guru yang
    komprehensif, tidak hanya teknis penggunaan sistem tetapi juga pedagogical
    strategies untuk memanfaatkan data analytics dalam pengambilan keputusan
    instruksional.
3. Parent Engagement Module: Mengembangkan modul untuk melibatkan orang

```
tua dalam proses pembelajaran, memberikan insights tentang perkembangan
anak dan strategi support di rumah.
```
```
D. Technological Advancements:
```

1. Edge Computing Implementation: Mengoptimalkan sistem untuk edge
    computing untuk mengurangi dependency pada koneksi internet, crucial untuk
    sekolah di daerah dengan infrastruktur terbatas.
2. Personalized AI Models: Mengembangkan mekanisme dimana model AI dapat
    terus belajar dan beradaptasi dengan karakteristik individu setiap siswa secara
    lebih mendalam seiring waktu.
3. Accessibility Features: Menambahkan fitur accessibility untuk siswa dengan
    kebutuhan khusus, seperti audio descriptions untuk visually impaired,
    simplified interfaces untuk cognitive disabilities.

```
E. Sustainability dan Impact:
```
1. Open Educational Resources: Membuat konten pembelajaran yang
    dikembangkan tersedia sebagai Open Educational Resources (OER) untuk
    mendukung pendidikan matematika yang lebih inklusif.
2. Partnership dengan Pemerintah: Membangun kemitraan dengan Kemdikbud
    untuk integrasi sistem dengan kurikulum nasional dan program peningkatan
    literasi matematika.
3. Community of Practice: Membangun komunitas praktisi (guru, peneliti,
    developer) untuk berbagi best practices, konten, dan pengalaman
    implementasi.

```
Sistem yang diusulkan bukan hanya solusi teknologi, tetapi merupakan
```
pendekatan holistik yang mengintegrasikan pedagogical principles, psychological
insights, dan technological innovations. Dengan implementasi yang tepat dan

pengembangan berkelanjutan, sistem ini memiliki potensi untuk memberikan

kontribusi signifikan dalam transformasi pembelajaran matematika di Indonesia dan

konteks global.


## DAFTAR PUSTAKA..............................................................................................................

```
Ashcraft, M. H., & Moore, A. M. (2009). Mathematics anxiety and the affective drop
```
in performance. _Journal of Psychoeducational Assessment_ , 27(3), 197-205.

```
Baker, R. S., D'Mello, S. K., Rodrigo, M. M. T., & Graesser, A. C. (2010). Better to
```
be frustrated than bored: The incidence, persistence, and impact of learners'

cognitive–affective states during interactions with three different computer-based learning

environments. _International Journal of Human-Computer Studies_ , 68(4), 223-241.

```
Bujak, K. R., Radu, I., Catrambone, R., MacIntyre, B., Zheng, R., & Golubski, G.
```
(2013). A psychological perspective on augmented reality in the mathematics classroom.

_Computers & Education_ , 68, 536-544.

Chen, Y., Wang, Q., Chen, H., Song, X., Tang, H., & Tian, M. (2019). An overview of
augmented reality technology. _Journal of Physics: Conference Series_ , 1237(2), 022082.

```
D'Mello, S., Lehman, B., Pekrun, R., & Graesser, A. (2014). Confusion can be
```
beneficial for learning. _Learning and Instruction_ , 29, 153-170.

```
D'Mello, S., Picard, R. W., & Graesser, A. (2007). Toward an affect-sensitive
```
AutoTutor. _IEEE Intelligent Systems_ , 22(4), 53-61.

```
Ekman, P., & Friesen, W. V. (1978). Facial Action Coding System: A technique for the
```
_measurement of facial movement_. Consulting Psychologists Press.

```
Fleming, N. D., & Mills, C. (1992). Not another inventory, rather a catalyst for
```
reflection. _To Improve the Academy_ , 11(1), 137-155.

```
Garzón, J., Kinshuk, Baldiris, S., Gutiérrez, J., & Pavón, J. (2020). How do
```
pedagogical approaches affect the impact of augmented reality on education? A meta-analysis

and research synthesis. _Educational Research Review_ , 31, 100334.

```
Howard, A., Sandler, M., Chu, G., Chen, L. C., Chen, B., Tan, M., ... & Adam, H.
```
(2019). Searching for MobileNetV3. _Proceedings of the IEEE/CVF International Conference_

_on Computer Vision_ , 1314-1324.

```
Kemdikbud. (2023). Laporan Survei Nasional Kecemasan Matematika Siswa
```
_Indonesia_. Jakarta: Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi.

```
Matsumoto, D. (2006). Culture and nonverbal behavior. In V. Manusov & M. L.
```
Patterson (Eds.), _The Sage handbook of nonverbal communication_ (pp. 219-235). Sage

Publications.

```
OECD. (2018). PISA 2018 Results: What Students Know and Can Do (Volume I).
```
Paris: OECD Publishing.


```
OECD. (2022). PISA 2022 Results (Volume I): The State of Learning and Equity in
```
_Education_. Paris: OECD Publishing.

```
Pashler, H., McDaniel, M., Rohrer, D., & Bjork, R. (2008). Learning styles: Concepts
```
and evidence. _Psychological Science in the Public Interest_ , 9(3), 105-119.

```
Piech, C., Bassen, J., Huang, J., Ganguli, S., Sahami, M., Guibas, L. J., &
```
Sohl-Dickstein, J. (2015). Deep knowledge tracing. _Advances in Neural Information
Processing Systems_ , 28.

```
Savva, N., Swiderski, A., & Sirlantzis, K. (2019). Facial emotion recognition in
```
classroom environment for enhancing learning. _IEEE Transactions on Affective Computing_ ,

12(3), 761-772.

```
Shute, V. J., & Zapata-Rivera, D. (2012). Adaptive educational systems. In Adaptive
```
_technologies for training and education_ (pp. 7-27). Cambridge University Press.

Woolf, B. P., Arroyo, I., Cooper, D., Burleson, W., & Muldner, K. (2009).
Affect-aware tutors: Recognising and responding to student affect. _International Journal of_

_Learning Technology_ , 4(3-4), 129-164.

```
Zadeh, L. A. (1965). Fuzzy sets. Information and Control , 8(3), 338-353.
```
```
Zhao, S., Zhang, Y., & Li, X. (2021). Fuzzy logic-based multimodal emotion fusion
```
for e-learning systems. _Journal of Educational Technology & Society_ , 24(2), 125-138.

```
Sumber Dataset:
```
```
FER-2013 Dataset. (2013). Facial Expression Recognition Challenge. Diakses dari
```
https://www.kaggle.com/c/challenges-in-representation-learning-facial-expression-recognitio
n-challenge

```
RAF-DB. (2019). Real-world Affective Faces Database. Research Center for
```
Intelligent Computing Systems. Diakses dari [http://www.whdeng.cn/RAF/model1.html](http://www.whdeng.cn/RAF/model1.html)

```
ASSISTments Dataset. (2020). The ASSISTments Longitudinal Data. Diakses dari
```
https://sites.google.com/site/assistmentsdata/home

```
Eedi Dataset. (2021). Diagnostic Questions Dataset. Diakses dari
```
https://diagnosticquestions.com/

```
Teknologi dan Framework:
```
```
TensorFlow Developers. (2023). TensorFlow: An end-to-end open source platform for
```
_machine learning_. https://www.tensorflow.org/


```
Flutter Team. (2023). Flutter: Google's UI toolkit for building natively compiled
```
_applications_. https://flutter.dev/

```
FastAPI. (2023). FastAPI: Modern, fast web framework for building APIs with
```
_Python_. https://fastapi.tiangolo.com/

```
MediaPipe. (2023). Cross-platform, customizable ML solutions for live and streaming
```
_media_. https://mediapipe.dev/

```
ARCore. (2023). Google's platform for building augmented reality experiences.
```
https://developers.google.com/ar

```
ARKit. (2023). Apple's framework for building augmented reality experiences.
```
https://developer.apple.com/augmented-reality/


