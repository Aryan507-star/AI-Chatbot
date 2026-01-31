#include <stdio.h>
#include <unistd.h>
#include <signal.h>
#include <string.h>

int fd[2];   // pipe file descriptors

void handler(int sig) {
    char buf[100];
    read(fd[0], buf, sizeof(buf));   // read from pipe
    printf("\n[Parent Received] %s\n", buf);
}

int main() {
    pipe(fd);

    signal(SIGUSR1, handler);   // parent will catch SIGUSR1

    pid_t pid = fork();

    if (pid == 0) {
        // Child process
        close(fd[0]);   // close read end

        char msg[] = "Hello from Child";
        write(fd[1], msg, strlen(msg)+1);

        kill(getppid(), SIGUSR1);  // send signal to parent
        return 0;
    } 
    else {
        // Parent process
        close(fd[1]);  // close write end

        printf("Parent waiting for signal...\n");

        while (1) {
            pause();   // wait for signal
        }
    }
}
