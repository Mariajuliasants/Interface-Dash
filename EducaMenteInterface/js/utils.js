
  const checkbox = document.getElementById('toggle-dark-mode');
  const body = document.body;

  // Verifica se já há um tema salvo
  if (localStorage.getItem('theme') === 'dark') {
    checkbox.checked = true;
    body.classList.add('dark');
  } else {
    body.classList.add('light');
  }

  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      body.classList.replace('light', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.replace('dark', 'light');
      localStorage.setItem('theme', 'light');
    }
  });



// Funções utilitárias para a aplicação
const utils = {
  // Formatar hora para exibição (HH:MM)
  formatTimeDisplay: function(time) {
    if (!time) return "";
    // Assumindo que o tempo está no formato "HH:MM:SS"
    return time.substring(0, 5); // Retorna "HH:MM"
  },
  
  // Formatar data para exibição (DD/MM/AAAA)
  formatDate: function(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  },
  
  // Obter a data atual formatada por extenso (ex: Segunda-feira, 8 de abril de 2025)
  getCurrentFormattedDate: function() {
    const options = {
      weekday: 'long',
      day: 'numeric', 
      month: 'long', 
      year: 'numeric'
    };
    
    const currentDate = new Date().toLocaleDateString('pt-BR', options);
    // Primeira letra maiúscula
    return currentDate.charAt(0).toUpperCase() + currentDate.slice(1);
  },
  
  // Obter dias da semana a partir de uma data
  getWeekDays: function(date) {
    const dayNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const shortDayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    
    const currentDay = date.getDay(); // 0 = Domingo, 1 = Segunda, etc.
    const result = [];
    
    // Calcular o dia inicial da semana (começando no domingo)
    let startingDay = date.getDate() - currentDay;
    
    // Gerar 7 dias a partir do dia inicial calculado
    for (let i = 0; i < 7; i++) {
      const day = new Date(date);
      day.setDate(startingDay + i);
      
      // Pular dias de fim de semana (0 é Domingo, 6 é Sábado)
      if (i === 0 || i === 6) continue;
      
      result.push({
        weekDayIndex: day.getDay(),
        name: dayNames[day.getDay()],
        shortName: shortDayNames[day.getDay()],
        date: day
      });
    }
    
    return result;
  },

  
  
  // Formatar a semana atual para exibição (ex: 5 a 11 de abril de 2025)
  getDisplayWeek: function(weekDays) {
    const startDay = weekDays[0];
    const endDay = weekDays[weekDays.length - 1];
    const startMonth = startDay.date.toLocaleString('pt-BR', { month: 'long' });
    const endMonth = endDay.date.toLocaleString('pt-BR', { month: 'long' });
    const startDate = startDay.date.getDate();
    const endDate = endDay.date.getDate();
    const year = startDay.date.getFullYear();
    
    if (startMonth === endMonth) {
      return `${startDate} a ${endDate} de ${startMonth} de ${year}`;
    } else {
      return `${startDate} de ${startMonth} a ${endDate} de ${endMonth} de ${year}`;
    }
  },
  
  // Obter atendimentos para um dia específico
  getAppointmentsForDay: function(appointments, day) {
    const dayDate = day.date.toISOString().split('T')[0];
    return appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.date).toISOString().split('T')[0];
      return appointmentDate === dayDate;
    });
  },
  
  // Obter atendimento para um horário específico
  getAppointmentForTimeSlot: function(appointments, time, day) {
    return appointments.find(apt => {
      const aptTime = this.formatTimeDisplay(apt.time);
      const aptDate = new Date(apt.date);
      const dayDate = day.date;
      
      return aptTime === time && 
             aptDate.getDate() === dayDate.getDate() && 
             aptDate.getMonth() === dayDate.getMonth() && 
             aptDate.getFullYear() === dayDate.getFullYear();
    });
  }
};