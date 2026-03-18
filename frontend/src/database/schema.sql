-- ============================================================
--   EstateHub — Real Estate Micro-Listing Platform
--   Database Schema (PostgreSQL DDL)
-- ============================================================

-- ── EXTENSIONS ──────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── ENUMS ───────────────────────────────────────────────────
CREATE TYPE property_type AS ENUM ('Apartment', 'Villa', 'Plot', 'Commercial');
CREATE TYPE inquiry_status AS ENUM ('pending', 'contacted', 'closed');

-- ────────────────────────────────────────────────────────────
-- TABLE: agents
-- ────────────────────────────────────────────────────────────
CREATE TABLE agents (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name        VARCHAR(100)  NOT NULL,
    email       VARCHAR(150)  NOT NULL UNIQUE,
    phone       VARCHAR(20)   NOT NULL,
    photo_url   TEXT,
    bio         TEXT,
    rating      DECIMAL(2,1)  DEFAULT 5.0 CHECK (rating BETWEEN 1 AND 5),
    is_active   BOOLEAN       DEFAULT TRUE,
    created_at  TIMESTAMP     DEFAULT NOW(),
    updated_at  TIMESTAMP     DEFAULT NOW()
);

-- ────────────────────────────────────────────────────────────
-- TABLE: properties
-- ────────────────────────────────────────────────────────────
CREATE TABLE properties (
    id                UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
    title             VARCHAR(200)  NOT NULL,
    price             BIGINT        NOT NULL CHECK (price > 0),
    location          VARCHAR(200)  NOT NULL,
    city              VARCHAR(100)  NOT NULL,
    state             VARCHAR(100),
    pincode           VARCHAR(10),
    latitude          DECIMAL(10,8),
    longitude         DECIMAL(11,8),
    property_type     property_type NOT NULL,
    short_description TEXT,
    description       TEXT,
    bedrooms          SMALLINT      DEFAULT 0 CHECK (bedrooms >= 0),
    bathrooms         SMALLINT      DEFAULT 0 CHECK (bathrooms >= 0),
    area_sqft         INTEGER       CHECK (area_sqft > 0),
    is_featured       BOOLEAN       DEFAULT FALSE,
    is_active         BOOLEAN       DEFAULT TRUE,
    agent_id          UUID          REFERENCES agents(id) ON DELETE SET NULL,
    created_at        TIMESTAMP     DEFAULT NOW(),
    updated_at        TIMESTAMP     DEFAULT NOW()
);

-- ────────────────────────────────────────────────────────────
-- TABLE: property_images
-- ────────────────────────────────────────────────────────────
CREATE TABLE property_images (
    id           UUID    PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id  UUID    NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    url          TEXT    NOT NULL,
    alt_text     VARCHAR(200),
    is_primary   BOOLEAN DEFAULT FALSE,
    display_order SMALLINT DEFAULT 0,
    created_at   TIMESTAMP DEFAULT NOW()
);

-- ────────────────────────────────────────────────────────────
-- TABLE: amenities
-- ────────────────────────────────────────────────────────────
CREATE TABLE amenities (
    id    SERIAL      PRIMARY KEY,
    name  VARCHAR(100) NOT NULL UNIQUE,
    icon  VARCHAR(50)
);

-- ────────────────────────────────────────────────────────────
-- TABLE: property_amenities  (Many-to-Many junction)
-- ────────────────────────────────────────────────────────────
CREATE TABLE property_amenities (
    property_id  UUID    NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    amenity_id   INTEGER NOT NULL REFERENCES amenities(id) ON DELETE CASCADE,
    PRIMARY KEY (property_id, amenity_id)
);

-- ────────────────────────────────────────────────────────────
-- TABLE: inquiries
-- ────────────────────────────────────────────────────────────
CREATE TABLE inquiries (
    id           UUID           PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id  UUID           REFERENCES properties(id) ON DELETE SET NULL,
    name         VARCHAR(100)   NOT NULL,
    email        VARCHAR(150)   NOT NULL,
    phone        VARCHAR(20),
    message      TEXT,
    status       inquiry_status DEFAULT 'pending',
    submitted_at TIMESTAMP      DEFAULT NOW(),
    updated_at   TIMESTAMP      DEFAULT NOW()
);

-- ────────────────────────────────────────────────────────────
-- TABLE: contact_messages  (general contact form)
-- ────────────────────────────────────────────────────────────
CREATE TABLE contact_messages (
    id           UUID         PRIMARY KEY DEFAULT uuid_generate_v4(),
    name         VARCHAR(100) NOT NULL,
    email        VARCHAR(150) NOT NULL,
    phone        VARCHAR(20),
    subject      VARCHAR(200),
    message      TEXT         NOT NULL,
    is_read      BOOLEAN      DEFAULT FALSE,
    submitted_at TIMESTAMP    DEFAULT NOW()
);

-- ── INDEXES ─────────────────────────────────────────────────
CREATE INDEX idx_properties_type     ON properties(property_type);
CREATE INDEX idx_properties_city     ON properties(city);
CREATE INDEX idx_properties_price    ON properties(price);
CREATE INDEX idx_properties_featured ON properties(is_featured) WHERE is_featured = TRUE;
CREATE INDEX idx_properties_active   ON properties(is_active)   WHERE is_active   = TRUE;
CREATE INDEX idx_inquiries_property  ON inquiries(property_id);
CREATE INDEX idx_inquiries_status    ON inquiries(status);
CREATE INDEX idx_property_images_pid ON property_images(property_id);

-- ── SEED: Amenities ──────────────────────────────────────────
INSERT INTO amenities (name, icon) VALUES
    ('Swimming Pool',    'droplets'),
    ('Gym',              'dumbbell'),
    ('Parking',          'car'),
    ('24/7 Security',    'shield'),
    ('Power Backup',     'zap'),
    ('Clubhouse',        'home'),
    ('Garden',           'trees'),
    ('Elevator',         'arrow-up'),
    ('High-Speed Internet', 'wifi'),
    ('CCTV',             'camera'),
    ('Solar Panels',     'sun'),
    ('Smart Home',       'cpu'),
    ('Home Theater',     'monitor'),
    ('Fire Safety',      'flame'),
    ('Cafeteria',        'coffee');

-- ── SAMPLE DATA ──────────────────────────────────────────────
INSERT INTO agents (name, email, phone) VALUES
    ('Priya Sharma',  'priya@estatehub.in',  '+91 98765 43210'),
    ('Rahul Mehta',   'rahul@estatehub.in',  '+91 99887 76655'),
    ('Anjali Singh',  'anjali@estatehub.in', '+91 98112 34567'),
    ('Vikram Joshi',  'vikram@estatehub.in', '+91 97654 32109'),
    ('Meera Reddy',   'meera@estatehub.in',  '+91 96543 21098'),
    ('Arjun Nair',    'arjun@estatehub.in',  '+91 95432 10987');
