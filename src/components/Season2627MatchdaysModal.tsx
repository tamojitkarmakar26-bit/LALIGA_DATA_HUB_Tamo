import React from 'react';
import { SeasonMatchdaysModal } from './SeasonMatchdaysModal';

interface Season2627MatchdaysModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToCalendar?: (matchday: number, season?: string) => void;
  onSelectClub?: (clubCode: string) => void;
  initialMatchday?: number;
  season?: string;
}

export const Season2627MatchdaysModal: React.FC<Season2627MatchdaysModalProps> = ({
  isOpen,
  onClose,
  onNavigateToCalendar,
  onSelectClub,
  initialMatchday,
  season = '2026-27',
}) => {
  return (
    <SeasonMatchdaysModal
      isOpen={isOpen}
      onClose={onClose}
      onNavigateToCalendar={onNavigateToCalendar}
      onSelectClub={onSelectClub}
      initialMatchday={initialMatchday}
      initialSeason={season}
    />
  );
};
