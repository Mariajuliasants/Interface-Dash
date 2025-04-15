// API Data Service
const api = {
  // Função para fazer requisições à API
  async fetchData(endpoint) {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error('Erro na requisição: ' + response.status);
      }
      return await response.json();
    } catch (error) {
      console.error(`Erro ao acessar ${endpoint}:`, error);
      return null;
    }
  },
  
  // Obter usuário atual
  async getCurrentUser() {
    return await this.fetchData('/api/user/current');
  },
  
  // Obter atendimentos do dia
  async getTodayAppointments() {
    return await this.fetchData('/api/appointments/today');
  },
  
  // Obter agendamentos semanais
  async getWeeklyAppointments(startDate) {
    const dateParam = startDate ? `?date=${startDate}` : '';
    return await this.fetchData(`/api/appointments/weekly${dateParam}`);
  },
  
  // Obter histórico de atendimentos
  async getAppointmentHistory() {
    return await this.fetchData('/api/appointments/history');
  },
  
  // Obter solicitações pendentes
  async getPendingRequests() {
    return await this.fetchData('/api/requests/pending');
  },
  
  // Obter solicitações concluídas
  async getCompletedRequests() {
    return await this.fetchData('/api/requests/completed');
  },
  
  // Obter horários disponíveis
  async getTimeSlots() {
    const timeSlots = await this.fetchData('/api/time-slots');
    return timeSlots.map(slot => {
      return {
        ...slot,
        time: slot.time.substring(0, 5) // Converter "HH:MM:SS" para "HH:MM"
      };
    });
  }
};

// Armazenamento de dados centralizado
const data = {
  currentUser: null,
  todayAppointments: [],
  weeklyAppointments: [],
  pastAppointments: [],
  pendingRequests: [],
  completedRequests: [],
  timeSlots: []
};