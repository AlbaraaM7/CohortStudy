import React, { useState, useEffect } from 'react';
import { Palette, Check, X, Sparkles } from 'lucide-react';
import { PALETTES } from '../data/palettes';
import './PaletteSwitcher.css';

export default function PaletteSwitcher({ activePaletteId, onSelectPalette }) {
  const [isOpen, setIsOpen] = useState(false);

  const activePalette = PALETTES.find((p) => p.id === activePaletteId) || PALETTES[0];

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-auto">
      {/* Floating Expandable Pill */}
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-3 px-4 py-3 rounded-full bg-panel/95 backdrop-blur-md border border-panel-border shadow-2xl text-xs font-mono text-primary hover:border-accent/50 hover:scale-105 transition-all group cursor-pointer"
          title="Change color palette live"
        >
          <div className="flex items-center -space-x-1">
            <span
              className="w-3.5 h-3.5 rounded-full ring-2 ring-panel"
              style={{ backgroundColor: activePalette.previewColor }}
            />
            <span
              className="w-3.5 h-3.5 rounded-full ring-2 ring-panel"
              style={{ backgroundColor: activePalette.secondaryColor }}
            />
          </div>
          <span className="font-semibold font-display text-sm group-hover:text-accent transition-colors">
            {activePalette.name}
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-accent/15 text-accent font-bold">
            Live Palettes
          </span>
        </button>
      ) : (
        <div className="palette-switcher-panel bg-panel/95 backdrop-blur-md border border-white/15 rounded-3xl p-5 shadow-2xl w-80 sm:w-96 animate-scale-up text-primary space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-panel-border">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-accent/20 text-accent flex items-center justify-center">
                <Palette className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-primary">Live Color Palettes</h4>
                <p className="text-[11px] text-secondary">Click to preview options live in real time</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-secondary hover:text-primary hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Close palette selector"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Palette Options List */}
          <div className="space-y-2">
            {PALETTES.map((pal) => {
              const isSelected = pal.id === activePaletteId;
              return (
                <button
                  key={pal.id}
                  onClick={() => {
                    onSelectPalette(pal.id);
                  }}
                  className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-accent/15 border-accent shadow-sm'
                      : 'bg-panel-card/70 border-panel-border hover:bg-panel-hover hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Swatch */}
                    <div className="flex items-center -space-x-1.5 shrink-0">
                      <span
                        className="w-5 h-5 rounded-full ring-2 ring-panel shadow-sm"
                        style={{ backgroundColor: pal.previewColor }}
                      />
                      <span
                        className="w-5 h-5 rounded-full ring-2 ring-panel shadow-sm"
                        style={{ backgroundColor: pal.secondaryColor }}
                      />
                    </div>

                    <div>
                      <div className="font-display font-bold text-sm text-primary flex items-center gap-2">
                        <span>{pal.name}</span>
                        {isSelected && (
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-accent text-canvas font-bold">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-secondary leading-tight mt-0.5">
                        {pal.tagline}
                      </p>
                    </div>
                  </div>

                  {isSelected ? (
                    <div className="w-6 h-6 rounded-full bg-accent text-canvas flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  ) : (
                    <span className="text-[11px] font-mono text-secondary/60 hover:text-primary shrink-0">
                      Select
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-panel-border flex items-center justify-between text-[11px] font-mono text-secondary">
            <span>All tokens comply with warm standards</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-accent hover:underline cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
