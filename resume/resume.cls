\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{resume}[Resume class]

\LoadClass{article}
\RequirePackage{xcolor}
\definecolor{slcolor}{HTML}{882B21}

% Sets margins
\RequirePackage[letterpaper, margin = 1in]{geometry}
\setlength{\parindent}{0in}

% Sets header/footer - footer used to set update date in ddmmyy format
% Also removes page numbers
\RequirePackage{fancyhdr}
\RequirePackage[long, nodayofweek]{datetime}
\pagestyle{fancy}
\fancyhf{}
\renewcommand{\headrulewidth}{0pt}
\renewcommand{\footrulewidth}{1pt}
\rfoot{\scriptsize{Updated \today}}

% Uses Roboto
\RequirePackage[T1]{fontenc}
\RequirePackage[utf8]{inputenc}
\RequirePackage[default]{roboto}
\RequirePackage{pbox}

% Allows hyperlinks in PDF
\RequirePackage[hidelinks]{hyperref}

% Defines \blt as a bullet point
\newcommand{\blt}{\,\textbullet \, }

% No hyphenation
\RequirePackage[none]{hyphenat}

% Defines params for title
% Definition for title default is empty
\let\@name\@empty
\let\@phone\@empty
\let\@email\@empty
\let\@website\@empty
\let\@linkedin\@empty
\let\@github\@empty

% Defines commands for contact info
\newcommand{\name}[1]{\def\@name{#1}}
\newcommand{\phone}[1]{\def\@phone{#1}}
\newcommand{\email}[1]{\def\@email{\href{mailto:#1}{#1}}}
\newcommand{\website}[1]{\def\@website{\href{https://#1}{#1}}}
\newcommand{\linkedin}[1]{\def\@linkedin{\blt \href{https://linkedin.com/in/#1}{linkedin.com/in/#1}}}
\newcommand{\github}[1]{\def\@github{\blt \href{https://github.com/#1}{github.com/#1}}}

% Makes title
\renewcommand{\maketitle}
{
  \begin{center}
    \begin{tabular}{l r}
      % Puts name on left, info on right using pbox
      % Right box is right and bottom aligned.
      {\Huge\@name} & \pbox[b]{\textwidth}{ 
      \hfill {\small\@phone} \blt {\small\@email} \\
      \hfill {\small\@website} {\small\@linkedin} {\small\@github}
      }
    \end{tabular} \\
  \end{center}
  \rule{\textwidth}{1pt}
}
  
% Changes sections to be not bold and to not be numbered
\setcounter{secnumdepth}{0}
\renewcommand{\section}
{
  \@startsection {section}{1}{\z@}
  {3pt}
  {6pt}
  {\normalfont\Large}
}
    
% Overview is a preset itemize that works well with projects/jobs
\RequirePackage{enumitem}
\newenvironment{overview}
{
  \begin{itemize}[itemsep = 0em, topsep = 0em, parsep = 0em, leftmargin = 12pt]
}
{
  \end{itemize}
}

% Adds an institution
\newcommand{\institution}[2]{
  \small \uppercase{#1} \smallskip \par

  #2 \normalsize \medskip
}

% Adds a degree
% Usage: \degree{name}{timeframe}{location}{overview}
\newcommand{\degree}[4]
{
  \large \textbf{#1}
  \normalsize \textit{\blt #2 \blt #3}

  #4 \smallskip
}
      
% Adds a job
% Usage: \position{name}{timeframe}{location}{website}{overview}
\newcommand{\position}[6]
{
  \large \textbf{#1}
  \normalsize \textit{\blt #2 \blt #3 \blt \href{https://#4}{#4}}

  #5 \smallskip
}


% Adds a project
% Usage: \project{name}{timeframe}{website}{overview}
\newcommand{\project}[4]
{
  \large \textbf{#1}
  \normalsize \textit{\blt #2 \blt \href{https://#3}{#3}}

  #4 \smallskip
}