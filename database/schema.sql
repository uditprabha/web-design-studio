-- ==========================================================
-- Udit Das Web Design Funnel - PostgreSQL Database Schema
-- Phase 4: Production Lead Management & CRM System
-- ==========================================================

-- Enable UUID extension if supported
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Leads Table
CREATE TABLE IF NOT EXISTS leads (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    business_name VARCHAR(255) NOT NULL,
    business_type VARCHAR(100) NOT NULL,
    whatsapp VARCHAR(50) NOT NULL,
    current_website VARCHAR(255),
    requirement VARCHAR(100) DEFAULT 'New Website',
    message TEXT,
    
    -- Marketing Attribution
    source VARCHAR(100) DEFAULT 'direct',
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    utm_content VARCHAR(100),
    utm_term VARCHAR(100),
    landing_page VARCHAR(255),
    
    -- Pipeline Status
    -- Allowed values: 'NEW', 'CONTACTED', 'QUALIFIED', 'PREVIEW_CREATED', 'PROPOSAL_SENT', 'WON', 'LOST'
    status VARCHAR(50) NOT NULL DEFAULT 'NEW',
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Lead Notes Table (Private Internal CRM Notes)
CREATE TABLE IF NOT EXISTS lead_notes (
    id VARCHAR(64) PRIMARY KEY,
    lead_id VARCHAR(64) NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    note TEXT NOT NULL,
    author VARCHAR(255) DEFAULT 'Udit Das',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Admin Users Table (Secure Password Hashed Accounts)
CREATE TABLE IF NOT EXISTS admin_users (
    id VARCHAR(64) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) DEFAULT 'Udit Das',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE
);

-- 4. Create Performance Indexes for Fast Lookups, Filtering & Aggregations
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_business_type ON leads(business_type);
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_whatsapp ON leads(whatsapp);
CREATE INDEX IF NOT EXISTS idx_lead_notes_lead_id ON lead_notes(lead_id);
